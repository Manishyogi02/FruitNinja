import { Text, TextStyle } from "pixi.js"

const addScoreAndLives = (app) => {
    const style = new TextStyle({
        fontFamily: 'Arial',
        fontSize: 32,
        fill: 'whitesmoke',
        stroke: '#000000',
        strokeThickness: 4
    })
    const scoreText = new Text(
        'Score: 0', style
    )
    scoreText.x = 20
    scoreText.y = 20
    app.stage.addChild(scoreText)
    const livesText = new Text(
        'Live: 3',
        style
    )
    livesText.x = app.screen.width - 130
    livesText.y = 20
    app.stage.addChild(livesText)
    return { scoreText, livesText }
}
export default addScoreAndLives