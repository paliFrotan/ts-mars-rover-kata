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
    output: process.stdout,
    terminal: false
});

function reset() {
    console.log("System crashed ....");
    rl.question("Do you want to rerun?", (rerun)=> {
        if (rerun.toLowerCase() === 'y') 
           start();
        else {
           console.clear();
           process.exit();
        };
    }) 

}

function start() {
    console.clear();
    console.log("----------------------------------------------------------");
    console.log("|                 Mars Rover Mission                     |")
    console.log("----------------------------------------------------------");
    let collisionPoints: CollisionPoints[] = [{ posX: -1, posY: -1}];
    rl.question('Enter plateau size: ', (answer) => {
        let ans = createPlateau(answer);
        if ('index' in ans) {
            console.log(ans.userMessage);
            rl.close();
            // process.exit();
        }
        function addRover(ans: Plateau) {
            rl.question('Enter rover starting position and direction: ', (roverInput) => {
                let rover = createRover(roverInput, ans);
                if ('index' in rover) {
                    console.log(rover.userMessage);
                    reset();
                    //process.exit();
                }
                else {
                    rl.question('Enter instructions: ', (instructions) => {
                        if ('x' in rover && 'width' in ans) {
                            let newPosition = instructionsRover(rover, ans, instructions, collisionPoints);
                            console.log("Rover moved to: ", newPosition);
                        }
                        rl.question('Add another rover? (y/n): ', (addAnother) => {
                            if (addAnother.toLowerCase() === 'y') {
                                addRover(ans);
                            } else {
                                start();
                            }
                        });
                    });
                };
            });
        }
        if ('index' in ans) {
            console.log(ans.userMessage);
        }
        else 
            addRover(ans);
    });
}
start();

