import { Application, Container } from "pixi.js"
import { useEffect } from "react"
import addStars from "./addStars.jsx";
import addMoon from "./addMoon.jsx";
import addMountain from "./addMountain.jsx";
import addTree from "./addTree.jsx";
import addGround from "./addGround.jsx";
import addTrain  from "./addTrain.jsx";
import addSmokes from "./addSmokes.jsx";

const ChooChooTrain = ()=>{
    useEffect (()=>{
        let app;
        (async()=>{
            const app = new Application()
            const trainContainer = new Container()
            await app.init({background:'#021f4b', resizeTo:window})
            document.body.appendChild(app.canvas)
            addStars(app)
            addMoon(app)
            addMountain(app)
            addTree(app)
            addGround(app)
            addTrain(app, trainContainer)
            addSmokes(app, trainContainer)
        })()
        return()=>{
            app.destroy(true, { children: true });
                if (app.canvas && app.canvas.parentNode) {
                    app.canvas.parentNode.removeChild(app.canvas);
                }
        }
    },[])
}

export default ChooChooTrain