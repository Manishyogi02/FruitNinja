import { Application, Assets, Circle, Container, Graphics, Sprite, Text, TextStyle } from "pixi.js"
import { useEffect } from "react"
import BackgroundImg from "/src/assets/bg_game.jpg"
import LoadingImg from "/src/assets/logo.png"
import progressBarImg from "/src/assets/progress_bar.png"
import { CreateFruits } from "./createFruits.jsx"
import addScoreAndLives from "./addScoreAndLives.jsx"
import startMenuBgImg from "../assets/display_bg.png"
import missfruitImg from "../assets/miss.png"
import createStartButton from "../FruitCuttingGame/startbtn.jsx"
import createSettingButton from "./settingbtn.jsx"
import createSettingAudiobtn from "./settingbtnAudio.jsx"
import createRetryButton from "./retrybtn.jsx"
import { bladSlashSound, btnClickSound, fruitMissSound, fruitsliceSound, gameOverSound } from "./audio.jsx"
import gameoverImg from "/src/assets/gameover.png"
import createQuitButton from "./quitGamebtn.jsx"
import createMouseTrail from "./mouseSlashtrail.jsx"

export const FruitCuttingGame = () => {
    useEffect(() => {
        (async () => {
            const app = new Application()
            await app.init({ resizeTo: window })
            document.body.appendChild(app.canvas)

            const texture = await Assets.load(BackgroundImg)
            const background = new Sprite(texture)

            background.width = app.screen.width
            background.height = app.screen.height
            app.stage.addChild(background)


            //Load Start Menu
            const menuTexture = await Assets.load(startMenuBgImg)
            const startMenu = new Sprite(menuTexture)
            startMenu.anchor.set(0.5)
            startMenu.scale = 0.8
            startMenu.x = app.screen.width / 2
            startMenu.y = app.screen.height / 2

            startMenu.width = app.screen.width
            startMenu.height = app.screen.height
            startMenu.visible = false
            app.stage.addChild(startMenu)

            //Loading game
            const loadingTexture = await Assets.load(LoadingImg)
            const Loading = new Sprite(loadingTexture)
            Loading.anchor.set(0.5)
            Loading.x = app.screen.width / 2
            Loading.y = app.screen.height / 2
            Loading.scale.set(Math.min(app.screen.width, app.screen.height) / 600)
            app.stage.addChild(Loading)

            const progressBarTexture = await Assets.load(progressBarImg)
            const progresssBar = new Sprite(progressBarTexture)
            progresssBar.anchor.set(0.5)
            progresssBar.x = app.screen.width / 2
            progresssBar.y = app.screen.height / 1.3
            progresssBar.scale.set(Math.min(app.screen.width, app.screen.height) / 1500)
            app.stage.addChild(progresssBar)

            //Loading Text
            const LoadingTextStyle = new TextStyle({
                fontSize: Math.min(app.screen.width, app.screen.height) * 0.02,
                fill : "whitesmoke",
                fontFamily : "Arial",
                fontWeight : "bold"
            })
            const LoadingText = new Text({
                text : "Loading...",
                style : LoadingTextStyle
            })
            LoadingText.x = progresssBar.x 
            LoadingText.y = progresssBar.y + progresssBar.height + 20
            app.stage.addChild(LoadingText) 



            // Load and Create Start Button (from external file)
            let fruitController;
            const { startbtn, circle, circularTextContainer } = await createStartButton(app, () => {
                btnClickSound.play()
                startMenu.visible = false
                startbtn.visible = false
                circularTextContainer.visible = false
                circle.visible = false

                settingbtn.visible = false
                circularTextContainer1.visible = false
                circle1.visible = false

                // Show score and lives when we start the game 
                scoreText.visible = true
                livesText.visible = true
                fruitController = CreateFruits(app, onFruitCut, onMissedFruit, onGameOver, textures)
            })

            //Hide initialy
            startbtn.visible = false
            circularTextContainer.visible = false
            circle.visible = false

            // Load and Create Setting Button (from external file)
            const { settingbtn, circle1, circularTextContainer1 } = await createSettingButton(app, () => {
                btnClickSound.play()
                startbtn.visible = false
                circularTextContainer.visible = false
                circle.visible = false

                settingbtn.visible = false
                circularTextContainer1.visible = false
                circle1.visible = false

                createSettingAudiobtn(app, startbtn, circle, circularTextContainer, settingbtn, circle1, circularTextContainer1)
            })
            //Hide Initialy
            settingbtn.visible = false
            circularTextContainer1.visible = false
            circle1.visible = false
            createMouseTrail(app)
            setTimeout(() => {
                Loading.visible = false
                progresssBar.visible = false
                LoadingText.visible = false
                startMenu.visible = true

                startbtn.visible = true
                circle.visible = true
                circularTextContainer.visible = true

                settingbtn.visible = true
                circle1.visible = true
                circularTextContainer1.visible = true
                
            }, 500)

            //Load Miss Fruit Image
            const missfruitTexture = await Assets.load(missfruitImg)
            const missFruit = new Sprite(missfruitTexture)
            missFruit.anchor.set(0.5)
            missFruit.scale = 0.2
            missFruit.x = app.screen.width / 2
            missFruit.y = app.screen.height / 2
            missFruit.width = app.screen.width * 0.2
            missFruit.height = missFruit.width
            missFruit.visible = false
            app.stage.addChild(missFruit)

            //Load Game Over Image
            const gameoverTexture = await Assets.load(gameoverImg)
            const gameOver = new Sprite(gameoverTexture)
            gameOver.anchor.set(0.5)
            gameOver.scale = 0.2
            gameOver.x = app.screen.width / 2
            gameOver.y = app.screen.height / 5.4
            gameOver.width = app.screen.width * 0.2
            gameOver.height = gameOver.width
            gameOver.visible = false
            app.stage.addChild(gameOver)

            const sheet = await Assets.load("/src/assets/atlas/texture.json")
            // console.log("🚀 ~ sheet:", sheet)
            const textures = sheet.textures
            console.log("🚀 ~ textures:", textures)


            const { retrybtn, circle3, circularTextContainer3 } = await createRetryButton(app, () => {
                btnClickSound.play()

                //hide startMenu and retrybtn 
                startMenu.visible = false
                retrybtn.visible = false
                circle3.visible = false
                circularTextContainer3.visible = false

                startbtn.visible = false
                circularTextContainer.visible = false
                circle.visible = false

                settingbtn.visible = false
                circularTextContainer1.visible = false
                circle1.visible = false

                quitbtn.visible = false
                quitbtnCircle.visible = false
                quitbtnCircularTextContainer.visible = false

                // Reset score/lives and start game
                scoreRef.current = 0
                LivesRef.current = 3
                updateScore(scoreRef.current)
                updateLives(LivesRef.current)
                scoreText.visible = true
                livesText.visible = true

                gameOver.visible = false
                gameOverScoreText.visible = false


                fruitController = CreateFruits(app, onFruitCut, onMissedFruit, onGameOver, textures)
            })
            retrybtn.visible = false
            if (circle3) circle3.visible = false
            if (circularTextContainer3) circularTextContainer3.visible = false

            const { quitbtn, quitbtnCircle, quitbtnCircularTextContainer } = await createQuitButton(app, () => {
                btnClickSound.play()

                //hide startMenu and retrybtn 
                startMenu.visible = true
                quitbtn.visible = false
                quitbtnCircle.visible = false
                quitbtnCircularTextContainer.visible = false

                retrybtn.visible = false
                circle3.visible = false
                circularTextContainer3.visible = false

                startbtn.visible = true
                circularTextContainer.visible = true
                circle.visible = true

                settingbtn.visible = true
                circularTextContainer1.visible = true
                circle1.visible = true
                gameOverScoreText.visible = false

                // Reset score/lives and start game( click on quit then click to start)
                scoreRef.current = 0
                LivesRef.current = 3
                updateScore(scoreRef.current)
                updateLives(LivesRef.current)

                gameOver.visible = false
                gameOverScoreText.visible = false
            })
            quitbtn.visible = false
            quitbtnCircle.visible = false
            quitbtnCircularTextContainer.visible = false

            //Load Score and Live
            const { scoreText, livesText } = addScoreAndLives(app)
            scoreText.visible = false
            livesText.visible = false

            //Load final score when game over
            const scaleFactor = Math.min(app.screen.width, app.screen.height) / 800

            const gameOverScoreText = new Text("Final Score: 0", new TextStyle({
                fontFamily: 'Arial',
                fontSize: 36 * scaleFactor,
                fill: 'yellow',
                stroke: '#000000',
                strokeThickness: 4 * scaleFactor
            }))
            gameOverScoreText.anchor.set(0.5)
            gameOverScoreText.x = app.screen.width / 2
            gameOverScoreText.y = app.screen.height / 2.7
            gameOverScoreText.visible = false
            app.stage.addChild(gameOverScoreText)

            const scoreRef = { current: 0 }
            const LivesRef = { current: 3 }

            const updateScore = (value) => {
                scoreText.text = `Score: ${value}`
            }

            const updateLives = (value) => {
                livesText.text = `Lives: ${value}`
            }

            const onFruitCut = () => {
                scoreRef.current += 1
                updateScore(scoreRef.current)
                fruitsliceSound.play()
            }

            const onGameOver = () => {
                if (fruitController?.stopGame) {
                    fruitController.stopGame();
                }
                // // alert("Game Over! You hit a bomb!")

                setTimeout(() => {
                    gameOver.visible = true
                    scoreText.visible = false
                    livesText.visible = false
                    gameOverScoreText.text = `Final Score: ${scoreRef.current}`
                    gameOverScoreText.visible = true

                    // Show start menu and retry and quit buttons when game over
                    startMenu.visible = true
                    retrybtn.visible = true
                    circle3.visible = true
                    circularTextContainer3.visible = true
                    quitbtn.visible = true
                    quitbtnCircle.visible = true
                    quitbtnCircularTextContainer.visible = true

                    // Hide game UI/buttons as needed
                    startbtn.visible = false
                    circle.visible = false
                    circularTextContainer.visible = false
                    settingbtn.visible = false
                    circle1.visible = false
                    circularTextContainer1.visible = false
                }, 200)

            }

            const onMissedFruit = () => {
                missFruit.visible = true
                fruitMissSound.play()

                setTimeout(() => {
                    missFruit.visible = false
                }, 1000)

                LivesRef.current -= 1
                updateLives(LivesRef.current)

                if (LivesRef.current <= 0) {
                    if (fruitController?.stopGame) {
                        fruitController.stopGame();
                    }
                    gameOverSound.play()
                    missFruit.visible = false
                    setTimeout(() => {
                        gameOver.visible = true
                        scoreText.visible = false
                        livesText.visible = false

                        gameOverScoreText.text = `Final Score ${scoreRef.current}`
                        gameOverScoreText.visible = true

                        startMenu.visible = true
                        retrybtn.visible = true
                        circle3.visible = true
                        circularTextContainer3.visible = true
                        quitbtn.visible = true
                        quitbtnCircle.visible = true
                        quitbtnCircularTextContainer.visible = true

                        startbtn.visible = false
                        circle.visible = false
                        circularTextContainer.visible = false
                        settingbtn.visible = false
                        circle1.visible = false
                        circularTextContainer1.visible = false
                    }, 200)

                }
            }
            // CreateFruits(app, onFruitCut, onMissedFruit, onGameOver, textures)

        })()
        return (() => {
            app.destroy(true, { children: true })
            if (app.canvas && app.canvas.parentNode) {
                app.canvas.parentNode.removeChild(app.canvas)
            }
        })
    }, [])
}