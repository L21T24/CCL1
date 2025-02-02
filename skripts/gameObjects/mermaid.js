// Import base game object class
import { BaseGameObject } from "./baseGameObject.js";

// Mermaid class extending BaseGameObject
class Mermaid extends BaseGameObject {
    constructor(image, x, y, width = 64, height = 32) {
        super(x, y, width, height);
        this.image = image; // Mermaid sprite image
        this.gravity = 0.05; // Gravity effect for downward movement
        this.velocityY = 0; // Vertical velocity
        
        // Load mermaid sprites from a spritesheet
        this.loadImagesFromSpritesheet('../../images/MermaidSprites.png', 2, 1);
    }

    // Update the mermaid's position and apply gravity
    update() {
        this.velocityY += this.gravity; // Apply gravity acceleration
        this.y += this.velocityY;      // Update vertical position
        
        // Switch sprite based on movement direction
        if (this.velocityY > 0) {
            this.switchCurrentSprites(0, 0); // Downward movement sprite
        } else {
            this.switchCurrentSprites(1, 1); // Upward movement sprite
        }
    }

    // Function to make the mermaid jump
    jump() {
        this.velocityY = -3; // Set upward velocity to simulate a jump
    }
}

// Export Mermaid class for use in other modules
export { Mermaid };

