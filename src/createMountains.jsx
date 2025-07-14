import { Graphics } from "pixi.js"

const createMountainGroup = (app) =>{
    //graphics objects to hold all mountain in a group
    const mountain = new Graphics()

    //width of all the mountain
    const width = app.screen.width / 2;

    //starting point of Y-axis of all the mountain
    const startY = app.screen.height;

    //start point on x-axis of individual mountain
    const startXLeft = 0;
    const startXMiddle = Number(app.screen.width) / 4;
    const startXRight = app.screen.width / 2;

    //height of individual mountain
    const heightLeft = app.screen.height / 2;
    const heightMiddle = (app.screen.height * 4) / 5;
    const heightRight = (app.screen.height * 2) / 3;

    //color of individual mountain
    const colorLeft = 0xc1c0c2;
    const colorMiddle = 0x7e818f;
    const colorRight = 0x8c919f;

    mountain.
        //Middle Mountain
        moveTo(startXMiddle, startY)//start mountain
        .bezierCurveTo(
            startXMiddle + width / 2,
            startY - heightMiddle,
            startXMiddle + width / 2,
            startY - heightMiddle,
            startXMiddle + width,
            startY,
        )//arc of mountain
        .fill({ color: colorMiddle })// fill the resulted shape

        // Draw the left mountain
        .moveTo(startXLeft, startY)
        .bezierCurveTo(
            startXLeft + width / 2,
            startY - heightLeft,
            startXLeft + width / 2,
            startY - heightLeft,
            startXLeft + width,
            startY,
        )
        .fill({ color: colorLeft })

        // Draw the right mountain
        .moveTo(startXRight, startY)
        .bezierCurveTo(
            startXRight + width / 2,
            startY - heightRight,
            startXRight + width / 2,
            startY - heightRight,
            startXRight + width,
            startY,
        )
        .fill({ color: colorRight });

    return mountain

}

export default createMountainGroup