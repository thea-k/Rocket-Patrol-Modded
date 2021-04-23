class Bees extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.MovementSpeed = 5;
        this.isFiring = false;
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyG)) {
            this.isFiring = true;
        }
    }
}