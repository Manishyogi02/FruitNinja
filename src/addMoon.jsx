import { Graphics } from "pixi.js";

const addMoon = (app) => {
    const moon = new Graphics();

    // Draw a full circle (moon base)
    moon.beginFill('yellow'); // yellow
    moon.drawCircle(20, 0, 70); // center at (0, 0), radius 40
    moon.endFill();

    // Draw a smaller overlapping circle to create crescent effect
    moon.beginFill('#021f4b'); // background color 
    moon.drawCircle(-16, -10, 75); // offset to left
    moon.endFill();

    // Position the moon on the screen
    moon.x = app.screen.width / 2 + 810;
    moon.y = app.screen.height / 4;

    // Add the moon to the stage
    app.stage.addChild(moon);
};

export default addMoon;
