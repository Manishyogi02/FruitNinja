import { Assets, Graphics, Sprite } from "pixi.js";
import { bombBlastSound, bombThrowSound, fruitThrowSound } from "./audio";

const createApple = (app, textures) => {
    const apple = new Sprite(textures["FruitSprites/apple_1_1.png"])
    apple.anchor.set(0.5)
    app.stage.addChild(apple);
    return apple;
};

const createGuava = (app, textures) => {
    const guava = new Sprite(textures["FruitSprites/guava_4_1.png"])
    guava.anchor.set(0.5)
    app.stage.addChild(guava);
    return guava;
};

const createApricot = (app, textures) => {
    const apricot = new Sprite(textures["FruitSprites/apricot_3_1.png"])
    apricot.anchor.set(0.5)
    app.stage.addChild(apricot);
    return apricot;
};

const createOrange = (app, textures) => {
    const orange = new Sprite(textures["FruitSprites/orange_0_1.png"])
    orange.anchor.set(0.5)
    app.stage.addChild(orange);
    return orange;
};

const createCoconut = (app, textures) => {
    const coconut = new Sprite(textures["FruitSprites/coconut_2_1.png"])
    coconut.anchor.set(0.5)
    app.stage.addChild(coconut);
    return coconut;
};

const createBomb = (app, textures) => {
    const Bomb = new Sprite(textures["FruitSprites/bomb_1.png"])
    Bomb.anchor.set(0.5)
    bombThrowSound.play()
    app.stage.addChild(Bomb)
    return Bomb;
};

const createWatermelon = (app, textures) => {
    const watermelon = new Sprite(textures["FruitSprites/watermelon_5_1.png"])
    watermelon.anchor.set(0.5)
    app.stage.addChild(watermelon);
    return watermelon;
};

export const CreateFruits = (app, onFruitCut, onMissedFruit, onGameOver, textures, createPopAnimation) => {
    let spawnIntervalId = null;
    let isGameOver = false;

    const fruits = []
    const createFruit = (createFn, x, y, isBomb = false, type) => {
        const fruit = createFn(app, textures, type);
        fruit.x = x
        fruit.y = y
        fruit.anchor?.set?.(0.5)
        fruit.interactive = true
        fruit.cursor = 'pointer'
        fruit.isBomb = isBomb
        fruit.type = type

        // Throw fruit higher and slower
        fruit.velocityY = -Math.random() * 5-7// ⬆ increased height (was -10 to -20)
        fruit.velocityX = (Math.random() - 0.5) * 4.5
        fruit.gravity = 0.08;                        // ⬇ slower fall speed (was 0.5)
        fruit.rotationSpeed = (Math.random() - 0.5) * 0.03 // subtle rotation
        fruit.alive = true

        fruits.push(fruit) // add to tracking array
        return fruit
    }

    //A mapping of fruits types to Left half,Right half,sprit's spain

    const textureMap = {
        apple: {
            left: textures["FruitSprites/apple_1_2.png"],
            right: textures["FruitSprites/apple_1_2.png"],
            stain: textures["FruitSprites/appleStain_0.png"],
        },
        coconut: {
            left: textures["FruitSprites/coconut_2_2.png"],
            right: textures["FruitSprites/coconut_2_2.png"],
            stain: textures["FruitSprites/coconutStain_2.png"],
        },
        guava: {
            left: textures["FruitSprites/guava_4_2.png"],
            right: textures["FruitSprites/guava_4_2.png"],
            stain: textures["FruitSprites/guavaStain_4.png"],
        },
        orange: {
            left: textures["FruitSprites/orange_0_2.png"],
            right: textures["FruitSprites/orange_0_2.png"],
            stain: textures["FruitSprites/orangeStain_1.png"],
        },
        watermelon: {
            left: textures["FruitSprites/watermelon_5_2.png"],
            right: textures["FruitSprites/watermelon_5_2.png"],
            stain: textures["FruitSprites/watermelonStain_5.png"],
        },
        apricot: {
            left: textures["FruitSprites/apricot_3_2.png"],
            right: textures["FruitSprites/apricot_3_2.png"],
            stain: textures["FruitSprites/apricotStain_3.png"],
        },
    };

    /**
    * Randomly picks a fruit function, spawns one at random X position
    * just below the screen so it flies upward.
    */

    const spawn = () => {
        const fruitFns = [
            { fn: createApple, type: "apple" },
            { fn: createCoconut, type: "coconut" },
            { fn: createGuava, type: "guava" },
            { fn: createOrange, type: "orange" },
            { fn: createWatermelon, type: "watermelon" },
            { fn: createApricot, type: "apricot" },
        ];

        const isBomb = Math.random() < 0.1;
        const { fn, type } = isBomb
            ? { fn: createBomb, type: "bomb" }
            : fruitFns[Math.floor(Math.random() * fruitFns.length)];

        const x = Math.random() * (app.screen.width * 0.6) + (app.screen.width * 0.2);

        const y = app.screen.height + 50;
        const fruit = createFruit(fn, x, y, isBomb, type);

        // Load sound when fruit/bomb throw
        if (!isBomb) {
            fruitThrowSound.play()
        } else {
            bombThrowSound.play()
        }

        fruit.on("pointerdown", () => {
            if (!fruit.alive || fruit.isBomb) return;
            fruit.alive = false;
            fruit.visible = false;

            if (isBomb) {
                onGameOver?.(); /**  if it's a bomb - triggers onGameOver 
                Otherwise :
                Hides original sprite
                Shows left/right halves and stain
                Calls onFruitCut
                Destroys sliced sprites after 100ms.
                */
            } else {
                 fruit.alive = false;
                fruit.visible = false;

                createPopAnimation(app, fruit.x, fruit.y)
                
                const tex = textureMap[fruit.type];
                if (!tex) return;

                const left = new Sprite(tex.left);
                const right = new Sprite(tex.right);
                const stain = new Sprite(tex.stain);

                [left, right, stain].forEach((s) => {
                    s.anchor.set(0.5);
                    s.x = fruit.x;
                    s.y = fruit.y;
                    app.stage.addChild(s);
                });
                right.scale.x = -1;

                setTimeout(() => {
                    [left, right, stain].forEach((s) => s.destroy());
                }, 100);

                onFruitCut?.();
            }
        });
    };

    app.ticker.add(() => {
        for (const fruit of fruits) {
            if (!fruit.alive) continue;
            fruit.velocityY += fruit.gravity; // apply gravity
            fruit.y += fruit.velocityY; // move fruits upward/downword
            fruit.x += fruit.velocityX  // move fruits curve
            fruit.scale.x = fruit.velocityX > 0 ? 1 : -1;

            fruit.rotation += fruit.rotationSpeed; // rotate the sprits

            if (fruit.y > app.screen.height + 50) {
                fruit.alive = false;
                fruit.visible = false;
                if (!fruit.isBomb) {
                    onMissedFruit?.();
                }
            }
        }
    });

    spawnIntervalId = setInterval(() => {
        if (!isGameOver) spawn();
    }, 2000);


    const slashPath = []
    let isDragging = false

    app.stage.eventMode = 'static'
    app.stage.hitArea = app.screen

    /** On pointerdown
        Enables dragging
        Resets slash path */
    app.stage.on("pointerdown", () => {
        isDragging = true
        slashPath.length = 0
    })
    app.stage.on("pointermove", (e) => {
        if (!isDragging) return
        const pos = e.global
        slashPath.push({ x: pos.x, y: pos.y })
        if (slashPath.length > 10) slashPath.shift()

        for (const fruit of fruits) {
            if (!fruit.alive) continue

            // Check for bomb hit separately
            if (fruit.isBomb) {
                const hit = slashPath.some(p => {
                    const dx = p.x - fruit.x
                    const dy = p.y - fruit.y
                    return Math.sqrt(dx * dx + dy * dy) < 40
                })

                if (hit) {
                    // Trigger bomb explosion or game over (no slicing here)
                    bombBlastSound.play()
                    fruit.alive = false
                    fruit.visible = false
                    onGameOver?.()
                }
            } else {
                // Handle fruit slashing (non-bomb)
                const hit = slashPath.some(p => {
                    const dx = p.x - fruit.x
                    const dy = p.y - fruit.y
                    return Math.sqrt(dx * dx + dy * dy) < 40
                })

                if (hit) {
                    fruit.alive = false
                    fruit.visible = false

                    createPopAnimation(app, fruit.x, fruit.y)
                    const tex = textureMap[fruit.type]
                    if (!tex) return

                    const left = new Sprite(tex.left)
                    const right = new Sprite(tex.right)
                    const stain = new Sprite(tex.stain)

                        ;[left, right, stain].forEach(s => {
                            s.anchor.set(0.5)
                            s.x = fruit.x
                            s.y = fruit.y
                            app.stage.addChild(s)
                        })
                    right.scale.x = -1

                    setTimeout(() => {
                        [left, right, stain].forEach(s => s.destroy())
                    }, 100)

                    onFruitCut?.()
                }
            }
        }
    })

/**On pointerup
Ends the slash
Clears path */
    app.stage.on("pointerup", () => {
        isDragging = false
        slashPath.length = 0
    })
    return {
        stopGame: () => {
            isGameOver = true;
            clearInterval(spawnIntervalId);
            fruits.forEach(fruit => {
                fruit.visible = false;
                fruit.alive = false;
            });
        }
    };

};
