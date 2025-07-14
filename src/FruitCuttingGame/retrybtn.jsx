import { Assets, Container, Graphics, Sprite, Text, TextStyle } from "pixi.js"
import retrybtnImg from "../assets/retrybtn.png"

 const createRetryButton = async (app, onClick) => {
    const screenWidth = app.screen.width
    const screenHeight = app.screen.height
    
    const scaleFactor = Math.min(screenWidth, screenHeight) / 800

    // Load texture
    const retrybtnTexture = await Assets.load(retrybtnImg)
    const retrybtn = new Sprite(retrybtnTexture)
    retrybtn.anchor.set(0.5)
    retrybtn.x =screenWidth * 0.35
    retrybtn.y = screenHeight * 0.50
    retrybtn.scale.set(scaleFactor) 
    retrybtn.interactive = true
    retrybtn.cursor = "pointer"

    app.stage.addChild(retrybtn)

    // Rotate animation
    app.ticker.add((time) => {
        const dx = time.deltaTime * 0.01
        retrybtn.rotation += dx
    })

    // circle & Text Configuration
    const circleRadius = 100 * scaleFactor
    const textPadding = 10 * scaleFactor
    const textColor = "#0077b6"
    const textString = "RETRY RETRY RETRY "
    const textStyle = new TextStyle({
        fontSize: 18 * scaleFactor,
        fill: textColor,
        fontWeight: "bold"
    })

    // circle3
    const circle3 = new Graphics()
    circle3.lineStyle(3 * scaleFactor, 0x0077b6)
    circle3.drawCircle(0, 0, circleRadius)
    circle3.x = retrybtn.x
    circle3.y = retrybtn.y
    app.stage.addChild(circle3)

    // Circular Text Container
    const circularTextContainer3 = new Container()
    circularTextContainer3.x = retrybtn.x
    circularTextContainer3.y = retrybtn.y
    app.stage.addChild(circularTextContainer3)

    const numChars = textString.length
    const angleStep = (2 * Math.PI) / numChars
    const radius = circleRadius + textPadding

    for (let i = 0; i < numChars; i++) {
        const char = textString[i]
        const charText = new Text(char, textStyle)
        charText.anchor.set(0.5)
        const angle = i * angleStep
        const x = radius * Math.cos(angle)
        const y = radius * Math.sin(angle)
        charText.position.set(x, y)
        charText.rotation = angle + Math.PI / 2
        circularTextContainer3.addChild(charText)
    }

    // Rotate circular text
    app.ticker.add(() => {
        circularTextContainer3.rotation -= 0.01
    })

    // Handle Click
    retrybtn.on("pointerdown", () => {
        onClick()
    })

    // Return references when I want  hide them later
    return { retrybtn, circle3, circularTextContainer3 }
}

export default createRetryButton