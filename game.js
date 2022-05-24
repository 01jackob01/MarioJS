var images = "images/";

kaboom({
    global: true,
    fullscreen: true,
    scale: 2,
    debug: true,
    clearColor: [0, 0, 0, 1],
});

loadSprite('coin', images + 'coin.png');
loadSprite('gunba', images + 'gunba1.png');
loadSprite('brick4', images + 'brick4.png');
loadSprite('brick3', images + 'brick4.png');
loadSprite('brickUpDown', images + 'brickupdown.png');
loadSprite('brickUp', images + 'brickaup.png');
loadSprite('mario', images + 'mario.png');
loadSprite('powerUp1', images + 'powerup1.png');

scene("game", () => {
    layers(['bg', 'obj', 'ui'], 'obj');

    const map = [
        "                                                   ",
        "                                                   ",
        "                                                   ",
        "                                                   ",
        "                                                   ",
        "                                                   ",
        "                                                   ",
        "                 +^+                               ",
        "             $                                     ",
        "======================   ========  ================",
    ]

    const levelCfg = {
        width: 20,
        height:20,
        "=": () => [
            sprite('brick4'),
            area(),
            solid()
        ],
        "+": () => [
            sprite('brick3'),
            area(),
            solid()
        ],
        "^": () => [
            sprite('brickUp'),
            area(),
            solid()
        ],
        "$": () => [
            sprite('coin'),
        ],
    }

    const gameLevel = addLevel(map, levelCfg)
});

go("game");