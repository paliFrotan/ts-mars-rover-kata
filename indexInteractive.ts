import { createRover,
    createPlateau,
    instructionsRover,
    Rover,
    Plateau,
    ErrorMessage,
    CollisionPoints,
            } from './src/rover';
  
            import * as readline from 'readline';

            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            
            // Define the colors for each cell
            const colors = ['\x1b[41m', '\x1b[42m', '\x1b[43m', '\x1b[44m', '\x1b[45m'];
            
            let rows = 5;
            let cols = 5;
            let rovers: { x: number; y: number }[] = [];
            
            function displayGrid() {
                // Display the grid
                for (let i = 0; i < rows; i++) {
                    let row = ' ';
                    for (let j = 0; j < cols; j++) {
                        // Check if there is a rover at this position
                        const rover = rovers.find(r => r.x === j && r.y === i);
                        if (rover) {
                            row += ' R ';
                        } else {
                            // Set the color for the current cell
                            row += colors[i % colors.length] + '   ' + '\x1b[0m';
                        }
                    }
                    console.log(row);
                }
            }
            
            function addRover() {
                rl.question('Enter rover starting position (x y): ', (roverInput) => {
                    const [x, y] = roverInput.split(' ').map(Number);
                    rovers.push({ x, y });
                    displayGrid();
                    moveRover();
                });
            }
            
            function moveRover() {
                rl.question('Enter rover move (u/d/l/r) or (a)dd rover: ', (move) => {
                    if (move === 'a') {
                        addRover();
                    } else {
                        const rover = rovers[rovers.length - 1];
                        switch (move) {
                            case 'u':
                                rover.y = (rover.y + 1) % rows;
                                break;
                            case 'd':
                                rover.y = (rover.y - 1 + rows) % rows;
                                break;
                            case 'l':
                                rover.x = (rover.x - 1 + cols) % cols;
                                break;
                            case 'r':
                                rover.x = (rover.x + 1) % cols;
                                break;
                        }
                        displayGrid();
                        moveRover();
                    }
                });
            }
            
            rl.question('Enter grid size (rows cols): ', (gridSize) => {
                [rows, cols] = gridSize.split(' ').map(Number);
                displayGrid();
                addRover();
            });