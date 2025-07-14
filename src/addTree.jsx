import createTree from "./createTree.jsx"

const addTree = (app) => {
    //width of each tree
    const treeWidth = 200

    //Position of the base of the trees on t-axis
    const y = app.screen.height - 20

    //spacing between each tree
    const spacing = 15

    //calculate the number of trees needed to fill the screen horizontally
    const countTree = app.screen.width / (treeWidth + spacing) + 1

    //araay, to store all the trees
    const trees = []

    for(let i = 0; i < countTree; i++){
        //randomize the height of each tree within a constrained range
        const treeHeight = 225 + Math.random() * 50

        //tree instance 
        const tree = createTree(treeWidth, treeHeight)

        //initial position the tree
        tree.x = i * (treeWidth + spacing)
        tree.y = y

        //add the tree to the stage and reference array 
        app.stage.addChild(tree)
        trees.push(tree)

        //animate the trees
        app.ticker.add((time)=>{
            // Calculate the amount of distance to move the trees per tick.
            const dx = time.deltaTime * .3
            trees.forEach((tree)=>{
                //move the trees leftwards
                tree.x -= dx

                // Reposition the trees when they move off screen.
                if(tree.x <= -(treeWidth / 2 + spacing)){
                    tree.x += countTree * (treeWidth + spacing) + spacing * 3
                }
            })
        })
    }
}

export default addTree