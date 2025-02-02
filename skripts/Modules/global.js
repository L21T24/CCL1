// Global game state object
const global = {
    mermaid: null, // Reference to the mermaid character
    objects: [], // Array to store all game objects (e.g., algae, shells, etc.)
    prevTotalRunningTime: 0, // Tracks total running time of the game in milliseconds
    deltaTime: 0 // Time difference between frames for smooth animations
};

// Export global state for use in other modules
export { global };