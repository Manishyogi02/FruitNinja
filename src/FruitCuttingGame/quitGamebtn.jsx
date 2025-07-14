import { Assets, Container, Graphics, Sprite, Text, TextStyle } from "pixi.js"
import quitbtnImg from "/src/assets/quit.png"

const createQuitButton = async (app, onclick) => {
    const screenWidth = app.screen.width
    const screenHeight = app.screen.height

    const scaleFactor = Math.min(screenWidth, screenHeight) / 800

    // Load texture and create quit button
    const quitbtnTexture = await Assets.load(quitbtnImg)
    const quitbtn = new Sprite(quitbtnTexture)
    quitbtn.anchor.set(0.5)
    quitbtn.x = screenWidth * 0.63 // responsive position
    quitbtn.y = screenHeight * 0.50
    quitbtn.scale.set(scaleFactor) // responsive scale
    quitbtn.interactive = true
    quitbtn.cursor = "pointer"
    app.stage.addChild(quitbtn)

    // Rotate button
    app.ticker.add((time) => {
        const dx = time.deltaTime * 0.01
        quitbtn.rotation += dx
    })

    // Circle & text setup
    const circleRadius = 100 * scaleFactor
    const textPadding = 10 * scaleFactor
    const textColor = "#d00000"
    const textString = "QUIT QUIT QUIT "
    const textStyle = new TextStyle({
        fontSize: 18 * scaleFactor,
        fill: textColor,
        fontWeight: "bold"
    })

    // Draw circle around button
    const quitbtnCircle = new Graphics()
    quitbtnCircle.lineStyle(3 * scaleFactor, 0x0077b6)
    quitbtnCircle.drawCircle(0, 0, circleRadius)
    quitbtnCircle.x = quitbtn.x
    quitbtnCircle.y = quitbtn.y
    app.stage.addChild(quitbtnCircle)

    // Create circular text
    const quitbtnCircularTextContainer = new Container()
    quitbtnCircularTextContainer.x = quitbtn.x
    quitbtnCircularTextContainer.y = quitbtn.y
    app.stage.addChild(quitbtnCircularTextContainer)

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
        quitbtnCircularTextContainer.addChild(charText)
    }

    // Animate the circular text rotation
    app.ticker.add(() => {
        quitbtnCircularTextContainer.rotation -= 0.01
    })

    // Click handler
    quitbtn.on("pointerdown", () => {
        onclick()
    })

    return { quitbtn, quitbtnCircle, quitbtnCircularTextContainer }
}

export default createQuitButton
