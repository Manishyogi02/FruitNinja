import { Graphics } from "pixi.js"

const addGround = (app)=>{
    const width = app.screen.width

    //create and dreaw a long rectangular strip across the screen and fill in the color of the snow(snow layer).
    const groundHeight = 20
    const groundY = app.screen.height
    const ground = new Graphics().rect(0, groundY - groundHeight, width, groundHeight).fill({color : 0xdddddd})

    //add ground to the stage
    app.stage.addChild(ground)

    //total height of the trrack. both the planks and rail layers.
    const trackHeight = 15

    //dimensions and parameters for the planks.
    const plankHeight = trackHeight / 2
    const plankWidth = 50
    const plankGap = 20
    const plankCount = width / (plankWidth + plankGap) + 1
    const plankY = groundY - groundHeight

    //create array to store all the planks
    const planks = []

    for(let i = 0; i < plankCount; i++){
        const plank = new Graphics().rect(0, plankY - plankHeight, plankWidth, plankHeight).fill({color : 0x241811})

        //position the plank to distribute it across the screen
        plank.x = i * (plankWidth + plankGap)

        //add plank to the stage and refrence the array
        app.stage.addChild(plank)
        planks.push(plank)
    }
    //create and draw rail strip graphics
    const railHeight = trackHeight / 2
    const railY = plankY - plankHeight
    const rail = new Graphics().rect(0, railY - railHeight, width, railHeight).fill({ color : 0x5c5c5c})

    app.stage.addChild(rail)

    //animate just the plank to simulate the passing of the ground.
    //since the raik and ground are uniform strips, they don't need to be animated.
    app.ticker.add((time)=>{
        //calculate the amount of distance to move the planks per tick.
        const dx = time.deltaTime * 6

        planks.forEach((plank)=>{
            //move the planks to the leftWards
            plank.x -= dx

            // Reposition the planks when they move off screen.
            if(plank.x <= -(plankWidth + plankGap)){
                plank.x += plankCount * (plankWidth + plankGap) + plankGap * 1.5
            }
        })
    })

}
export default addGround