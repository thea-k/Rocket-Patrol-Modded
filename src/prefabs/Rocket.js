class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.MovementSpeed = 3;
        this.isFiring = false;
        this.sfxRocket = scene.sound.add('sfx_rocket');
    }

    update() {

        if (!this.isFiring) {
            if (keyLeft.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.MovementSpeed;
            } else if (keyRight.isDown && this.x <= game.config.width - 
                borderUISize - this.width) {
                    this.x += this.MovementSpeed;
                }
        }

        if (Phaser.Input.Keyboard.JustDown(keyF)) {
            this.isFiring = true;
            this.sfxRocket.play();
        }

        if (this.isFiring && this.y >- borderUISize*3 + borderPadding) {
            this.y -= this.MovementSpeed;
        }

        if (this.y <= borderUISize*3 + borderPadding) {
            this.isFiring = false;
            this.y = game.config.height - borderUISize - borderPadding;
        }
    }

    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}