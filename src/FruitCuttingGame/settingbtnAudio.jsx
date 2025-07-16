import { Assets, Sprite, Text, TextStyle } from "pixi.js"
import audioOnImg from "/src/assets/audio_icon_1.png"
import audioOffImg from "/src/assets/audio_icon_2.png"
import backbtnImg from "/src/assets/but_exit.png"
import { btnClickSound, gamesoundTrack } from "../FruitCuttingGame/audio"
import addButtonAnimation from "./addButtonAnimation"


const createSettingAudiobtn = async (app, startbtn, circularTextContainer, circle, settingbtn, circle1, circularTextContainer1) => {
    const screenWidth = app.screen.width
    const screenHeight = app.screen.height

    // Base scale factor
    const scaleFactor = Math.min(screenWidth, screenHeight) / 800
    
    const textStyle = new TextStyle({
        fontSize: 30 * scaleFactor,
        fill: "#774936",
        fontFamily: "arial",
        fontWeight: "bold",

    })

    const audioText = new Text({
        text: "AUDIO",
        style: textStyle
    })

    audioText.x = screenWidth * 0.47
    audioText.y = screenHeight *0.35
    audioText.scale.set(scaleFactor)

    app.stage.addChild(audioText)


    const audioOnTexture = await Assets.load(audioOnImg)
    const audioOn = new Sprite(audioOnTexture)
    audioOn.x = screenWidth * 0.48
    audioOn.y = screenHeight * 0.50
    audioOn.scale.set(scaleFactor)
    audioOn.interactive = true
    audioOn.cursor = "pointer"

    app.stage.addChild(audioOn)
    
    audioOn.on("pointerdown", () => {
        btnClickSound.play()
        gamesoundTrack.play()
    })
    addButtonAnimation(audioOn)

    const audioOffTexture = await Assets.load(audioOffImg)
    const audioOff = new Sprite(audioOffTexture)
    audioOff.x = screenWidth * 0.35
    audioOff.y = screenHeight * 0.50
    audioOff.scale.set(scaleFactor)
    audioOff.interactive = true
    audioOff.cursor = "pointer"

    app.stage.addChild(audioOff)
    
    audioOff.on("pointerdown", () => {
        btnClickSound.play()
        gamesoundTrack.stop()
    })
    addButtonAnimation(audioOff)

    const backTexture = await Assets.load(backbtnImg)
    const backbtn = new Sprite(backTexture)
    backbtn.x = screenWidth * 0.60
    backbtn.y = screenHeight * 0.50
    backbtn.scale.set(scaleFactor)
    backbtn.interactive = true
    backbtn.cursor = "pointer"

    app.stage.addChild(backbtn)
    
    backbtn.on("pointerdown", () => {
        btnClickSound.play()
        audioOff.visible = false
        audioOn.visible = false
        audioText.visible = false
        backbtn.visible = false
        
        settingbtn.visible = true
        circle1.visible = true
        circularTextContainer1.visible = true
        
        startbtn.visible = true
        circle.visible = true
        circularTextContainer.visible = true
    })
    addButtonAnimation(backbtn)
}

export default createSettingAudiobtn