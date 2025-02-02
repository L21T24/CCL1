// Import global game state
import { global } from "../Modules/global.js";

// Base class for all game objects
class BaseGameObject {
    constructor(x, y, width, height) {
        this.x = x; // X-coordinate position
        this.y = y; // Y-coordinate position
        this.width = width; // Object width
        this.height = height; // Object height
        this.active = true; // Tracks whether the object is active
        this.collided = false; // Tracks if collision has already been handled
    }

    // Get the bounding box of the object for collision detection
    getBounds() {
        return {
            top: this.y,
            bottom: this.y + this.height,
            left: this.x,
            right: this.x + this.width,
        };
    }

    // Animation data for sprite handling
    animationData = {
        "animationSprites": [], // Array of animation frames
        "timePerSprite": 0.08, // Time each sprite is displayed
        "currentSpriteElapsedTime": 0, // Time elapsed for current sprite
        "firstSpriteIndex": 0, // Index of first sprite in animation
        "lastSpriteIndex": 0, // Index of last sprite in animation
        "currentSpriteIndex": 0 // Current sprite being displayed
    };

    // Draw the game object on the canvas
    draw(context) {
        let sprite = this.getNextSprite(); // Get the next sprite for animation
        context.drawImage(sprite, this.x, this.y, this.width, this.height);
    }

    // Check collision with another game object
    checkCollision(otherObject) {
        const bounds1 = this.getBounds();
        const bounds2 = otherObject.getBounds();

        return (
            bounds1.right > bounds2.left &&
            bounds1.left < bounds2.right &&
            bounds1.bottom > bounds2.top &&
            bounds1.top < bounds2.bottom
        );
    }

    // Remove the object from the game
    remove() {
        this.active = false;
    }

    // Get the next sprite frame for animation
    getNextSprite = function () {
        this.animationData.currentSpriteElapsedTime += global.deltaTime;

        if (this.animationData.currentSpriteElapsedTime >= this.animationData.timePerSprite) {
            this.animationData.currentSpriteIndex++;
            this.animationData.currentSpriteElapsedTime = 0;
            if (this.animationData.currentSpriteIndex > this.animationData.lastSpriteIndex) {
                this.animationData.currentSpriteIndex = this.animationData.firstSpriteIndex;
            }
        }
        return this.animationData.animationSprites[this.animationData.currentSpriteIndex];
    };

    // Load images into the animationSprites array
    loadImages = function (imageSources) {
        for (let i = 0; i < imageSources.length; i++) {
            let image = new Image();
            image.src = imageSources[i];
            this.animationData.animationSprites.push(image);
        }
    };

    // Load sprites from a spritesheet and split them into animation frames
    loadImagesFromSpritesheet(spritesheetPath, cols, rows) {
        const totalSprites = cols * rows;
        this.animationData.animationSprites = Array.from({ length: totalSprites }, () => new Image());

        const spritesheet = new Image();
        spritesheet.src = spritesheetPath;

        spritesheet.addEventListener("load", () => {
            const spritesheetWidth = spritesheet.width;
            const spritesheetHeight = spritesheet.height;
            const singleSpriteWidth = Math.floor(spritesheetWidth / cols);
            const singleSpriteHeight = Math.floor(spritesheetHeight / rows);

            const tempSpritesheetCanvas = document.createElement("canvas");
            const tempSpritesheetCtx = tempSpritesheetCanvas.getContext("2d");
            tempSpritesheetCanvas.width = singleSpriteWidth;
            tempSpritesheetCanvas.height = singleSpriteHeight;

            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    tempSpritesheetCtx.clearRect(0, 0, singleSpriteWidth, singleSpriteHeight);
                    tempSpritesheetCtx.drawImage(
                        spritesheet,
                        col * singleSpriteWidth,
                        row * singleSpriteHeight,
                        singleSpriteWidth,
                        singleSpriteHeight,
                        0,
                        0,
                        singleSpriteWidth,
                        singleSpriteHeight
                    );
                    
                    const index = row * cols + col;
                    this.animationData.animationSprites[index].src = tempSpritesheetCanvas.toDataURL();
                }
            }
        });
    }

    // Change animation sprite range
    switchCurrentSprites = function (firstSpriteIndex, lastSpriteIndex) {
        this.animationData.currentSpriteIndex = firstSpriteIndex;
        this.animationData.firstSpriteIndex = firstSpriteIndex;
        this.animationData.lastSpriteIndex = lastSpriteIndex;
    }
}

// Export BaseGameObject class for use in other modules
export { BaseGameObject };
