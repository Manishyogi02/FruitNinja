const addButtonAnimation = (button, onClick) => {
    button.interactive = true;
    button.buttonMode = true;

    
    button.on("pointerover", () => {
        button.scale.set(1.1);  
    });

    button.on("pointerout", () => {
        button.scale.set(1); 
    });

    button.on("pointerdown", () => {
        button.scale.set(0.9);  
    });

    button.on("pointerup", () => {
        button.scale.set(1.1);  
        if (onClick) onClick();
    });

    button.on("pointerupoutside", () => {
        button.scale.set(1);  // Restore scale if pointer is up outside
    });
}
export default addButtonAnimation