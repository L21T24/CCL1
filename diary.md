# Development Log – Mermaid Game  

## **📅 13.01.2025 – Initial Planning**  
The project kickoff! I spent the entire day figuring out how I wanted the gameplay to work. Instead of having the mermaid move from left to right, I decided to keep her static and make the algae move instead.  

## **📅 14.01.2025 – Implementing Algae Movement**  
I started by implementing the algae as a simple stretched green rectangle. I managed to get it moving and disappearing, but I encountered one major issue:  
- The randomly generated gaps between the algae were sometimes placed in a way that made the game unplayable.  

## **📅 15.01.2025 – Fixing Algae Generation & Adding a Fish**  
I imported a fish sprite to test the mermaid's placement, though it had no collision yet.  
With the help of a tutor, I fixed the algae's random gap placement. The issue was caused by an incorrect random value assignment, which led to gaps pushing each other out of view.  

## **📅 16.01.2025 – Object-Oriented Programming (OOP) Refactor**  
Florian helped me refactor the game to use Object-Oriented Programming (OOP).  
- Shells now spawn randomly.  

## **📅 17.01.2025 – Improving Collisions & Counter Implementation**  
- Shells now spawn without overlapping with the algae.  
- I added a counter that increases when the mermaid touches the shells.  
- Collision detection for the top and bottom of the canvas is still missing.  

## **📅 18.01.2025 – Rest Day**  
Took a well-deserved break.  

## **📅 19.01.2025 – Artwork Begins**  
I started drawing the comic and the mermaid sprite.  

## **📅 20.01.2025 – Mermaid Animation & Backgrounds**  
- Began implementing the mermaid’s sprites; she now flops around when moving.  
- The algae no longer flicker because the loading issue was finally fixed.  
- I created and implemented pretty background images.  
- Added a start and end screen.  

## **📅 21.01.2025 – Collision System Completed**  
With the help of a tutor, I added collision detection that prevents the mermaid from swimming out of the top of the screen.  

## **📅 22.01.2025 – Animated Pot Added**  
I created the pot sprite and animated it. Fixed small details around the game.  

## **📅 23.01.2025 – Fixing Animations & UI Polish**  
- Spent the entire day fixing the animations for the comic in the start screen.  
- Adjusted the pot animation on the end screen.  

## **📅 24.01.2025 – Final Presentation Day**  
The game is complete, and I presented it! 🎉  
