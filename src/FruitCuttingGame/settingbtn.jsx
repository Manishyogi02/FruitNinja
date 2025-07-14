import { Assets, Container, Graphics, Sprite, Text, TextStyle } from "pixi.js"
import settingbtnImg from "/src/assets/settingbtn.png"

const createSettingButton = async (app, onclick) => {
    const screenWidth = app.screen.width
    const screenHeight = app.screen.height

    // Base scale factor
    const scaleFactor = Math.min(screenWidth, screenHeight) / 800
    // Load texture
    const settingbtnTexture = await Assets.load(settingbtnImg)
    const settingbtn = new Sprite(settingbtnTexture)
    settingbtn.anchor.set(0.5)
    settingbtn.x = screenWidth * 0.63
    settingbtn.y = screenHeight * 0.50
    settingbtn.scale.set(scaleFactor) // Make button size responsive
    settingbtn.interactive = true
    settingbtn.cursor = "pointer"

    app.stage.addChild(settingbtn)

    app.ticker.add((time) => {
        const dx = time.deltaTime * 0.01
        settingbtn.rotation += dx
    })

    // Circle & Text Configuration
    const circleRadius = 100 * scaleFactor
    const textPadding = 10 * scaleFactor
    const circleColor = 0x0000ff // blue
    const textColor = "whitesmoke"
    const textString = "SETTING SETTING "
    const textStyle = new TextStyle({
        fontSize: 18 * scaleFactor,
        fill: textColor,
        fontWeight: "bold",
    })
    //Circle
    const circle1 = new Graphics()
    circle1.lineStyle(3, scaleFactor, 0x0077b6)
    circle1.drawCircle(0, 0, circleRadius)
    circle1.x = settingbtn.x
    circle1.y = settingbtn.y
    app.stage.addChild(circle1)

    // Circular Text Container
    const circularTextContainer1 = new Container()
    circularTextContainer1.x = settingbtn.x
    circularTextContainer1.y = settingbtn.y
    app.stage.addChild(circularTextContainer1)

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

        circularTextContainer1.addChild(charText)
    }
    app.ticker.add(() => {
        circularTextContainer1.rotation -= 0.01
    })

    //handle click
    settingbtn.on("pointerdown", () => {
        onclick()
    })

    return { settingbtn, circle1, circularTextContainer1 }

}
export default createSettingButton