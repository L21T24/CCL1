// Import global game state
import { global } from "./global.js";

// Function to handle mermaid movement
function move(event) {
    // Check if the pressed key is the spacebar
    if (event.key === " ") {
        global.mermaid.jump(); // Trigger mermaid's jump action
    }
}

// Listen for keypress events to control the mermaid
document.addEventListener("keypress", move);