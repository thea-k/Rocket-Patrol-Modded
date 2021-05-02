class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('menu', 'assets/Menu.png');
        this.load.audio('bgm', 'assets/bgm.wav');
        this.load.audio('sfx_select', 'assets/sfx_select.wav');
        this.load.audio('pop', 'assets/pop.wav');
        this.load.audio('sfx_bee', 'assets/sfx_bee.wav');
    }

    create() {
        this.bgm = this.sound.add('bgm', { volume: 1, loop:true });
        this.bgm.play();

        let menu = this.add.tileSprite(
            0,0,640,480, 'menu',
        ).setOrigin(0,0);

        let menuConfig = {
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 0
        }

        //show menu text
        // this.add.text(
        //     game.config.width/2,
        //     game.config.height/2 - borderUISize - borderPadding,
        //     'ROCKET PATROL',
        //  menuConfig).setOrigin(0.5);
        // this.add.text(
        //     game.config.width/2,
        //     game.config.height/2,
        //     'Use 🠐🠒 arrows to move & (F) to fire',
        //     menuConfig).setOrigin(0.5);
        //     menuConfig.backgroundColor = '#00FF00';
        //     menuConfig.color = '#000';
        //     this.add.text(
        //         game.config.width/2,
        //         game.config.height/2 + borderUISize + borderPadding,
        //         'Press 🠐 for Novice or 🠒 for Expert',
        //         menuConfig).setOrigin(0.5);
        
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT); 
    }

    update() {           
        if (Phaser.Input.Keyboard.JustDown(keyLeft)) {
            //easy difficulty
            game.settings = {
              spaceshipSpeed: 3,
              gameTimer: 60000    
            }
            this.bgm.stop();
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
          }
          if (Phaser.Input.Keyboard.JustDown(keyRight)) {
            this.bgm.stop();
            //hard difficulty
            game.settings = {
              spaceshipSpeed: 4,
              gameTimer: 45000    
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
          }
    }
}