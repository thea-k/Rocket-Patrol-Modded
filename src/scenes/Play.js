class Play extends Phaser.Scene {
    constructor () {
        super("playScene");
    }

    preload() {
        this.load.image('starfield', 'assets/starfield.png');
        this.load.image('rocket', 'assets/rocket.png');
        this.load.image('ship', 'assets/spaceship.png');
        this.load.spritesheet('explosion', 'assets/explosion.png',
            {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.audio('sfx_select', 'assets/blip_select12.wav');
        this.load.audio('sfx_explosion', 'assets/explosion38.wav');
        this.load.audio('sfx_rocket', 'assets/rocket_shot.wav');
    }

    create () {
        this.starfield = this.add.tileSprite(
            0,0,640,480,'starfield',
        ).setOrigin(0,0);

        this.p1Rocket = new Rocket(
            this, 
            game.config.width/2,
            game.config.height - borderUISize - borderPadding,
            'rocket'
            );

        // (scene, x, y, asset name, sprite frame, pointValue)
        // setOrigin to upper left hand of sprite
        this.ship1 = new Ship(
            this,
            game.config.width + borderUISize*6,
            borderUISize*4,
            'ship',
            0,
            30
        ).setOrigin(0,0);
        
        this.ship2 = new Ship(
            this,
            game.config.width + borderUISize*3,
            borderUISize*5 + borderPadding*2,
            'ship',
            0,
            20
        ).setOrigin(0,0);

        this.ship3 = new Ship(
            this,
            game.config.width,
            borderUISize*6 + borderPadding*4,
            'ship',
            0,
            10
        ).setOrigin(0,0);

        // green UI background
        this.add.rectangle(
            0, 
            borderUISize + borderPadding, 
            game.config.width, 
            borderUISize*2, 
            0x00FF00, 
            ).setOrigin(0,0);
        // white borders
        this.add.rectangle(
            0, 
            0, 
            game.config.width, 
            borderUISize, 
            0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(
            0, 
            game.config.height - borderUISize, 
            game.config.width, borderUISize, 
            0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(
            0, 
            0, 
            borderUISize, 
            game.config.height, 
            0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(
            game.config.width - borderUISize, 
            0, 
            borderUISize, 
            game.config.height, 
            0xFFFFFF).setOrigin(0 ,0);

        this.p1Score = 0;

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 100
        }
        //binding scoreLeft to scene
        this.scoreLeft = this.add.text(
                                    borderUISize +  borderPadding,
                                    borderUISize +borderPadding*2,
                                    this.p1Score,
                                    scoreConfig);

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);          
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers(
                'explosion',
                {start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        //game over flag
        this.gameOver = false;

        //60-second play clock
        scoreConfig.fixedWidth = 0;

         /*time that ellapses (in milliseconds), callback function itself,
            any arguments we'd want to call in the function(null, this is a 
            reference to the play scene)*/
        
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(
                game.config.width/2, 
                game.config.height/2, 
                'GAME OVER',
                scoreConfig).setOrigin(0.5);
            this.add.text(
                game.config.width/2,
                game.config.height/2 + 64,
                'Press (R) to Restart or 🠐 for Menu',
                scoreConfig).setOrigin(0.5);
                    this.gameOver = true;
        }, null, this);
    } 
    
    update() {
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLeft)) {
            this.scene.start("menuScene");
        }
        this.starfield.tilePositionX -= 4; // background scroll to the right

        // epic function call for epic movement
        if (!this.gameOver) {
            this.p1Rocket.update();
            this.ship1.update();
            this.ship2.update();
            this.ship3.update();
        }
        

        if (this.checkCollision(this.p1Rocket, this.ship1)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship1);
        }
        if (this.checkCollision(this.p1Rocket, this.ship2)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship2);
        }
        if (this.checkCollision(this.p1Rocket, this.ship3)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship3);
        }
    }

    checkCollision(rocket, ship) {
        if ( rocket.x + rocket.width > ship.x && 
            rocket.x < ship.x + ship.width && 
            rocket.y + rocket.height > ship.y && 
            rocket.y < ship.y + ship.height) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
            //hide ship
            ship.alpha = 0;
            // create explosion at ship's position
            let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
            boom.anims.play('explode');             //play explode animation
            boom.on('animationcomplete', () => {    //callback after anim completes
                ship.reset();                       //reset ship position
                ship.alpha = 1;                     //make ship visible again
                boom.destroy();                     //remove explosion sprite
                this.sound.play('sfx_explosion');
            });

            //add score and repaint
            this.p1Score += ship.points;
            this.scoreLeft.text = this.p1Score;
    }
}