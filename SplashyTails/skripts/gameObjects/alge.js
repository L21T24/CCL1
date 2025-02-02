// Import base game object class
import { BaseGameObject } from "./baseGameObject.js";

// Algae (Alge) class extending BaseGameObject
class Alge extends BaseGameObject {
    constructor(image, x, y, width, height, velocityX = -2) {
        super(x, y, width, height);
        this.image = image; // Image representation of the algae
        this.velocityX = velocityX; // Speed of horizontal movement
    }

    // Draw the algae on the canvas
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    // Update the algae's position
    update() {
        this.x += this.velocityX; // Move algae to the left
    }

    // Check if the algae has moved out of the canvas
    isOutOfCanvas() {
        return this.x + this.width < 0; // Returns true if algae is off-screen
    }
}

// Export Alge class for use in other modules
export { Alge };

