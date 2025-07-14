import { Graphics } from "pixi.js"

const createTree = (width, height) =>{
    const tree = new Graphics()

    //Define the dimensions of the tree trunk
    const trunkWidth = 30
    const trunkHeight = height / 4

    //Dimension and parameter for the tree crown layers
    const crownHeight = height - trunkHeight
    const crownLevels = 4
    const crownLevelsHeight = crownHeight / crownLevels
    const crownWidthIncrement = width / crownLevels

    //Define color of the parts
    const crownColor = 0x264d3d
    const trunkColor = 0x563929

    //draw the trunk
    tree.rect(-trunkWidth/2, -trunkHeight, trunkWidth, trunkHeight)
    .fill({color : trunkColor})

    for(let i = 0; i < crownLevels; i++){
        const y = -trunkHeight - crownLevelsHeight * i
        const levelWidth = width - crownWidthIncrement * i
        const offset = i < crownLevels - 1 ? crownLevelsHeight / 2 : 0
        
        //draw the crown layer
        tree
        .moveTo(-levelWidth / 2, y)
        .lineTo(0, y - crownLevelsHeight - offset)
        .lineTo(levelWidth / 2, y)
        .fill({color : crownColor})
    }
    return tree
}

export default createTree