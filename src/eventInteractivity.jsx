import { Application, Assets, Sprite } from "pixi.js"
import { Children, useEffect } from "react"
import BackgroundImg from '../src/assets/cuttingBoard.jpeg'

const EventInteractivity = () =>{
    useEffect((app)=>{
        (async()=>{
            const app = new Application()
            await app.init({background:'red',resizeTo : window})
            document.body.appendChild(app.canvas)

            const texture = await Assets.load(BackgroundImg)
            const background = new Sprite(texture)
            background.width = app.screen.width
            background.height = app.screen.height
            
            app.stage.addChild(background)
        })()
        return(()=>{
            app.destroy(true, {Children:true})
            if(app.canvas && app.canvas.parentNode){
                app.canvas.parentNode.removeChild(app.canvas)
            }
        })
    },[])
}
export default EventInteractivity