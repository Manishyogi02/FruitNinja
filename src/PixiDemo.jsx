import React, { useEffect } from "react";
import { Application, Assets, Sprite } from "pixi.js";

const PixiComponent = () => {
    useEffect(() => {
        let app;
        (async () => {
            
            // Create a PixiJS application.
            const app = new Application();
            // Intialize the application.
            await app.init({ background: 'whitesmoke', resizeTo: window });

            // Then adding the application's canvas to the DOM body.
            document.body.appendChild(app.canvas);

            //load the bunny texture
            const texture = await Assets.load('https://pixijs.com/assets/bunny.png')

            // create a new sprite from an image path (Sprite use to displ;ay single impage)
            const bunny =  new Sprite(texture)

            //add to stage
            app.stage.addChild(bunny)

            //center the sprite's  anchor point
            bunny.anchor.set(0.5)

            //move the sprite to rhe center of the screen
            bunny.x =  app.screen.width/2
            bunny.y = app.screen.height/2

            //add animation loop callback to the application's ticker
            app.ticker.add((time)=>{
                bunny.rotation += 0.1*time.deltaTime
            })
        })();

        // Cleanup function to destroy the app and remove canvas
        return () => {
            app.destroy(true, { children: true });
            if (app.canvas && app.canvas.parentNode) {
                app.canvas.parentNode.removeChild(app.canvas);
            }
        };
    }, []);

    return null; // No visible React element rendered
};

export default PixiComponent;
