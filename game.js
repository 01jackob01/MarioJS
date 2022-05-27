var images = "images/";

kaboom({
    global: true,
    fullscreen: true,
    scale: 2,
    debug: true,
    clearColor: [0, 0, 0, 1],
    background: [0, 102, 102, 1],
});

const moveSpeed = 120
const jumpForce = 360
const bigJumpForce = 550
let currentJumpForce = jumpForce

loadSprite('coin', images + 'coin.png');
loadSprite('gunba', images + 'gunba1.png');
loadSprite('brick4', images + 'brick4.png');
loadSprite('brick3', images + 'brick4.png');
loadSprite('brickUpDown', images + 'brickupdown.png');
loadSprite('brickUp', images + 'brickaup.png');
loadSprite('coinSurprise', images + 'brickaup.png');
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
        "                *++^+                              ",
        "                                                   ",
        "             $                #                    ",
        "=================================  ================",
    ]

    const levelCfg = {
        width: 20,
        height:20,
        "=": () => [
            sprite('brick4'),
            area(),
            solid(),
        ],
        "+": () => [
            sprite('brick3'),
            area(),
            solid(),
        ],
        "^": () => [
            sprite('brickUp'),
            area(),
            solid(),
            "brickUp",
        ],
        "!": () => [
            sprite('powerUp1'),
            body(),
            area(),
            solid(),
            "powerUp1",
        ],
        "*": () => [
            sprite('coinSurprise'),
            area(),
            solid(),
            "coinSurprise",
        ],
        "x": () => [
            sprite('brickUpDown'),
            area(),
            solid(),
        ],
        "$": () => [
            sprite('coin'),
            area(),
            solid(),
            "coin",
        ],
        "#": () => [
            sprite('gunba'),
            area(),
            solid(),
            "gunba",
        ],
    }

    const gameLevel = addLevel(map, levelCfg)

    const scoreLable = add(
        [
            text("Score: 0", {
                size: 14,
            }),
            pos(30, 6),
            layer('ui'),
            {
                value: 0,
            }
        ]
    )

    add(
        [
            text('level ' + "1.1", {
                size: 14,
            }),
            pos(300, 6),
        ]
    )

    function big()
    {
        let time = 0
        let isBig = false
        return {
            update () {
                if (isBig) {
                    timer -= dt()
                    if (timer <= 0) {
                        this.smallify()
                    }
                }
            },
            isBig() {
                return isBig
            },
            smallify() {
                this.scale = vec2(1)
                currentJumpForce = jumpForce
                timer = 0
                    isBig = false
            },
            biggify(time) {
                this.scale = vec2(2)
                currentJumpForce = bigJumpForce
                timer = time
                isBig = true
            }
        }
    }

    action("powerUp1", (m) => {
        m.move(20, 0)
    })

    const player = add(
        [
            sprite('mario'),
            area(),
            solid(),
            pos(30,0),
            body(),
            big(),
            origin('bot'),
        ]
    )

    player.onHeadbutt((obj) => {
        if (obj.is("coinSurprise")) {
            gameLevel.spawn("$", obj.gridPos.sub(0, 1))
            destroy(obj)
            gameLevel.spawn("x", obj.gridPos.sub(0, 0))
        }
        if (obj.is("brickUp")) {
            gameLevel.spawn("!", obj.gridPos.sub(0, 1))
            destroy(obj)
            gameLevel.spawn("x", obj.gridPos.sub(0, 0))
        }
    })

    player.collides('powerUp1', (m) => {
        destroy(m)
        player.biggify(6)
    })

    player.collides('coin', (c) => {
        destroy(c)
        scoreLable.value += 10
        scoreLable.text = "Score: " + scoreLable.value
    })

    onKeyDown('left', () => {
        player.move(-moveSpeed, 0)
    })

    onKeyDown('right', () => {
        player.move(moveSpeed, 0)
    })

    onKeyPress('space', () => {
        if(player.grounded()) {
            player.jump(currentJumpForce)
        }
    })
});

go("game");