import { Application, Assets, Sprite } from "pixi.js"
import { useEffect } from "react"
import girlImage from "./assets/girImg.png"
import fireImage from "./assets/fire.jpeg"
import addStars from "./addStars.js"
import addMoon from "./addMoon.js"
// import pandaGif from "./assets/panda.gif"

const SpriteDemo = () => {
    // let app;
    useEffect((app) => {
        (async () => {
            //Pixi Application
            const app = new Application()
            //Initialize Application and auto resize canvas to fit browser window
            await app.init({ background: "#021f4b", resizeTo: window })
            //Add application's canvas to the DOM body
            document.body.appendChild(app.canvas)
            addStars(app)
            addMoon(app)

            const texture = await Assets.load(girlImage) //load the bunny texture
            const texture1 = await Assets.load(fireImage)
            // const texture2 = await Assets.load(pandaGif)

            const bunny = new Sprite(texture) //Sprite display the texture (single image) on the screen
            const bunny1 = new Sprite(texture1)
            // const bunny2 = new Sprite(texture2)

            app.stage.addChild(bunny) //stage hold the sprite object
            app.stage.addChild(bunny1)
            // app.stage.addChild(bunny2)

            bunny.anchor.set(0.5) //anchor set the center point of sprite
            bunny1.anchor.set(0.5)
            // bunny2.anchor.set(0.5)

            bunny.scale.set(0.6) //scale set the size of the bunny
            bunny1.scale.set(0.6) 
            // bunny2.scale.set(0.6) 

            bunny.alpha = (0.5) //use to transparent bunny 
            bunny1.alpha = (0.5)
            // bunny2.alpha = (0.5)

            //Define the bunny's position on the screen(Move the bunny to the center of the screen)
            bunny.x = app.screen.width / 2
            bunny.y = app.screen.height / 2
            bunny1.x = app.screen.width / 2
            bunny1.y = app.screen.height / 2
            // bunny2.x = app.screen.width / 2
            // bunny2.y = app.screen.height / 2

            bunny.interactive = true
            bunny.cursor = "pointer"
            bunny1.interactive = true
            bunny1.cursor = "pointer"

            let isAnimating = false
            bunny.on("pointerdown", () => {
                isAnimating = !isAnimating
                bunny.texture = isAnimating ? texture : texture1// swape texture on clicking
            })
            bunny1.on("pointerdown", () => {
                isAnimating = !isAnimating ? texture1 : texture
            })

            app.ticker.add((time) => {
                bunny.scale.x = Math.sin(performance.now() / 1000) + 1;
                bunny1.scale.x = Math.sin(performance.now() / 1000) + 1;
                const dx = time.deltaTime * 5
                // bunny.x += dx //move bunny to the rightward
                    // bunny1.x += dx //move bunny to the leftward
                    // bunny1.rotation -= dx * 0.1 //Rotate the bunny
              


                if(isAnimating){
                    bunny.x -= dx //move bunny to the leftward
                    bunny.rotation += dx * 0.1 //Rotate the bunny
                    bunny1.x += dx //move bunny to the leftward
                    bunny1.rotation -= dx * 0.1 //Rotate the bunny
                // reset the position when it goes off screen(left side)
                if (bunny.x < - bunny.width) {
                    bunny.x = app.screen.width + bunny.width
                }
                 if (bunny1.x >  app.screen.width + bunny1.width) {
                    bunny1.x = -bunny1.width
                }
            }

                //reset the position when it goes off screen(right side)
                // if(bunny.x > app.screen.width + bunny.width){
                //     bunny.x = -bunny.width
                // }
            })

        })();
        return (() => {
            //will remove the canvas from the DOM body when component unmount
            app.destroy(true, { children: true });
            if (app.canvas && app.canvas.parentNode) {
                app.canvas.parentNode.removeChild(app.canvas);
            }
        })
    }, [])
}
export default SpriteDemo