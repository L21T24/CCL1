// Import base game object class
import { BaseGameObject } from "./baseGameObject.js";

// Shell class extending BaseGameObject
class Shell extends BaseGameObject {
    constructor(image, x, y, width, height, velocityX = -2) {
        super(x, y, width, height);
        this.image = image; // Image representation of the shell
        this.velocityX = velocityX; // Horizontal movement speed
        this.initialY = y; // Store the initial Y position for wave motion
        this.angle = 0; // Angle used for sine wave motion
    }

    // Draw the shell on the canvas
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    // Update shell position and apply sinusoidal motion
    update() {
        this.x += this.velocityX; // Move shell to the left

        // Apply sinusoidal motion for vertical "swimming" effect
        this.angle += 0.07; // Increment angle to control wave speed
        this.y = this.initialY + Math.sin(this.angle) * 5; // Adjust amplitude for wave height
    }
}

// Export Shell class for use in other modules
export { Shell };

