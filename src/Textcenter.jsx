import { Application, Text } from "pixi.js";
import { useEffect } from "react";

const TextCenter = ()=>{
    useEffect(()=>{
        let app;
        (async()=>{
            //create pixi.js application 
            const app = new Application()
            
            //initialize the application 
            await app.init({background: 'white', resizeTo:window})

            //add the application canvas to the DOM body
            document.body.appendChild(app.canvas)

            //display the Text using Text keyword from pixi.js
            const myText = new Text({
                text: 'Hello World',
                style:{
                    color:'green', fontSize:36, fontFamily: 'MyFont'
                }
            })

            //position the anchor point of the text
            myText.anchor.set(0.5)

            //move text to the center of the screen 
            myText.x = app.screen.width/2
            myText.y = app.screen.height/2

            //add the myText variable to the pixijs, So it will render
            app.stage.addChild(myText)
        })()
        
        // remove canva when component unmount 
        return()=>{
            if(app.canvas && app.canvas.parentNode){
                app.canvas.parentNode.removeChild(app.canvas)
            }
        }
    },[])

}

export default TextCenter