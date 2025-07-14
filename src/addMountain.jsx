import { Graphics } from "pixi.js"
import createMountainGroup from "./createMountains.jsx"

const addMountain = (app) => {
    //create two mountain groups where one will be on the screen and second will be off screen
    const graphics = new Graphics()

    const group1 = createMountainGroup(app)
    const group2 = createMountainGroup(app)

    //position of 2nd group off screen to the right
    group2.x = app.screen.width;

    //add the mountain group to the stage
    app.stage.addChild(group1, group2)

    //animate the mountain
    app.ticker.add((time) => {
        // Calculate the amount of distance to move the mountain groups per tick.
        const dx = time.deltaTime * 1;

        // Move the mountain groups leftwards.
        group1.x -= dx;
        group2.x -= dx;
        if (group1.x <= -app.screen.width) {
            group1.x += app.screen.width * 2
        }
        if (group2.x <= -app.screen.width) {
            group2.x += app.screen.width * 2;
        }
    })
    return graphics
}

export default addMountain