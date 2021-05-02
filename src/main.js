/*
 * Name: Thea Knasiak
 * Project: Modded Rocket Patrol Assignment
 * Mods: Added parallax scrolling (10 pts)
 *       Changed all assets (UI, player, enemies, sfx) (60 pts)
 *       Faster, smaller enemy type worth more ponts (20 pts)
 * Date: 5/2/2021
 * Time it took to complete: like way too long i feel like my eyes are melting
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

let keyLeft, keyRight, keyF, keyR, keyG;
