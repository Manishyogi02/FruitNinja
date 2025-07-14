import { Graphics } from "pixi.js"

const addStars = (app) => {
    const starCount = 20
    //graphics object will hold all the stars
    const graphics = new Graphics()

    //for loop create a 5-point stars 
    for (let i=0; i<starCount; i++){

        // randomize the position, radius, and rotation of each stars
        const x = (i * 0.78695 * app.screen.width) % app.screen.width
        const y = (i * 0.9382 * app.screen.height) % app.screen.height
        const radius = 2 + Math.random() * 3
        const rotation = Math.random() * Math.PI * 2

        // Draw the stars onto the graphics object
        graphics.star(x, y, 5, radius, 0, rotation).fill({color:'whitesmoke', alpha: radius/5})
    }

    app.stage.addChild(graphics)
}

export default addStars