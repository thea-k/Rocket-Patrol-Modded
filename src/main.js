<<<<<<< HEAD
/*
 * Name: Thea Knasiak
 * Project: Modded Rocket Patrol Assignment
*/

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15; //width of the border will be 1/15 the height
let borderPadding = borderUISize / 3; //width of the padded will be 1/3 the borderUISize

let keyLeft, keyRight, keyF, keyR;
=======
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15; //width of the border will be 1/15 the height
let borderPadding = borderUISize / 3; //width of the padded will be 1/3 the borderUISize

let keyLeft, keyRight, keyF, keyR;
>>>>>>> ac9d5a75cf240b70e6717417ccd59a020b322bb0
