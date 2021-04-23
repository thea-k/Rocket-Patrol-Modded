class Play extends Phaser.Scene {
    constructor () {
        super("playScene");
    }

    preload() {
        this.load.image('foreground', 'assets/background.png');
        this.load.image('background', 'assets/foreground.png');
        this.load.image('bee', 'assets/Bees.png');
        this.load.image('purpleFlower', 'assets/Flower1.png');
        this.load.image('pinkFlower', 'assets/Flower2.png');
        this.load.image('blueFlower', 'assets/Flower3.png');
        this.load.spritesheet('explosion', 'assets/explosion.png',
            {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.audio('sfx_select', 'assets/blip_select12.wav');
        this.load.audio('sfx_explosion', 'assets/explosion38.wav');
        this.load.audio('sfx_rocket', 'assets/rocket_shot.wav');
    }

    create () {
        this.foreground = this.add.tileSprite(
            0,0,640,480, 'foreground',
        ).setOrigin(0,0);

        this.background = this.add.tileSprite(
            0,0,640,480,'background',
        ).setOrigin(0,0);

        this.bee = new Rocket(
            this, 
            game.config.width/2,
            game.config.height - borderUISize - borderPadding*1.5,
            'bee'
            );

        // (scene, x, y, asset name, sprite frame, pointValue)
        // setOrigin to upper left hand of sprite
        this.flower1 = new Ship(
            this,
            game.config.width + borderUISize*6,
            borderUISize*4,
            'purpleFlower',
            0,
            30
        ).setOrigin(0,0);
        
        this.flower2 = new Ship(
            this,
            game.config.width + borderUISize*3,
            borderUISize*5 + borderPadding*2,
            'pinkFlower',
            0,
            20
        ).setOrigin(0,0);

        this.flower3 = new Ship(
            this,
            game.config.width,
            borderUISize*6 + borderPadding*4,
            'blueFlower',
            0,
            10
        ).setOrigin(0,0);

        // green UI background
        this.add.rectangle(
            0, 
            borderUISize + borderPadding, 
            game.config.width, 
            borderUISize*2, 
            0xF26866, 
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
            fontFamily: 'Courier New',
            fontSize: '28px',
            backgroundColor: '#F2F27E',
            color: '#F26866',
            align: 'right',
            padding: {
                top: 0,
                bottom: 0,
                right: 25
            },
            fixedWidth: 75
        }

        let timerConfig = {
            fontFamily: 'Courier New',
            fontSize: '28px',
            backgroundColor: '#F2F27E',
            align: 'right',
            padding: {
                top: 0,
                bottom: 0,
                left: 100
            },
            fixedWidth: 75
        }

        //binding scoreLeft to scene
        this.scoreLeft = this.add.text(
                                    borderUISize +  borderPadding,
                                    borderUISize + borderPadding*2,
                                    this.p1Score,
                                    scoreConfig);

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);  
        keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);        
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

        this.timeLeft = this.add.text(
                                    borderUISize*12 + borderPadding*13,
                                    borderUISize + borderPadding*2,
                                    this.time.delayedCall(
                                                game.settings.gameTimer, () => {},
                                                null,this),
                                    timerConfig);
        
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
        this.background.tilePositionX -= 2; // background scroll to the right
        this.background.tilePositionY -= 2; // background scroll to the right
        this.foreground.tilePositionY -= 2;

        // epic function call for epic movement
        if (!this.gameOver) {
            this.bee.update();
            this.flower1.update();
            this.flower2.update();
            this.flower3.update();
        }
        

        if (this.checkCollision(this.bee, this.flower1)) {
            this.bee.reset();
            this.shipExplode(this.flower1);
        }
        if (this.checkCollision(this.bee, this.flower2)) {
            this.bee.reset();
            this.shipExplode(this.flower2);
        }
        if (this.checkCollision(this.bee, this.flower3)) {
            this.bee.reset();
            this.shipExplode(this.flower3);
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