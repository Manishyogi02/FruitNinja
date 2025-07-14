import { Assets, Container, Graphics, Sprite, Text, TextStyle } from "pixi.js"
import startbtnImg from "/src/assets/startbtnImg.png"

const createStartButton = async (app, onClick) => {
    const screenWidth = app.screen.width
    const screenHeight = app.screen.height

    // Base scale factor
    const scaleFactor = Math.min(screenWidth, screenHeight) / 800

    // Load texture and create start button
    const startbtnTexture = await Assets.load(startbtnImg)
    const startbtn = new Sprite(startbtnTexture)
    startbtn.anchor.set(0.5)
    startbtn.x = screenWidth * 0.35
    startbtn.y = screenHeight * 0.50
    startbtn.scale.set(scaleFactor) // Make button size responsive
    startbtn.interactive = true
    startbtn.cursor = "pointer"
    app.stage.addChild(startbtn)

    // Rotate animation
    app.ticker.add((time) => {
        const dx = time.deltaTime * 0.01
        startbtn.rotation += dx
    })

    // Responsive circle + text values
    const circleRadius = 100 * scaleFactor
    const textPadding = 10 * scaleFactor
    const textColor = "#0077b6"
    const textString = "TAP HERE TO START "
    const textStyle = new TextStyle({
        fontSize: 18 * scaleFactor,
        fill: textColor,
        fontWeight: "bold"
    })

    // Draw circle around start button
    const circle = new Graphics()
    circle.lineStyle(3 * scaleFactor, 0x0077b6)
    circle.drawCircle(0, 0, circleRadius)
    circle.x = startbtn.x
    circle.y = startbtn.y
    app.stage.addChild(circle)

    // Create circular text around circle
    const circularTextContainer = new Container()
    circularTextContainer.x = startbtn.x
    circularTextContainer.y = startbtn.y
    app.stage.addChild(circularTextContainer)

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

        circularTextContainer.addChild(charText)
    }

    // Animate the circular text rotation
    app.ticker.add(() => {
        circularTextContainer.rotation -= 0.01
    })

    // Handle start button click
    startbtn.on("pointerdown", () => {
        onClick()
    })

    return { startbtn, circle, circularTextContainer }
}

export default createStartButton
