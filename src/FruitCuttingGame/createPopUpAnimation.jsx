import { Assets, Sprite } from "pixi.js"
import plusOnePopImg from "/src/assets/pop1.png"

const createPopAnimation = async (app, x, y) => {
    const popUpTexture = await Assets.load(plusOnePopImg)
    const plusOnePop = new Sprite(popUpTexture)

    plusOnePop.x = x
    plusOnePop.y = y
    plusOnePop.anchor.set(0.5)
    plusOnePop.alpha = 1
    plusOnePop.scale.set(0.6)
    app.stage.addChild(plusOnePop)

    let elapsed = 0
    let duration = 60 

    const animate = () => {
        if (elapsed > duration) {
            plusOnePop.destroy()
            app.ticker.remove(animate)
            return
        }
        plusOnePop.y -= 1.5
        plusOnePop.alpha -= 1 / duration
        elapsed++
    }
    app.ticker.add(animate)
}

export default createPopAnimation