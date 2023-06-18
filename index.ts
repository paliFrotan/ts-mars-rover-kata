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
 

function reset(ans: ErrorMessage, newValue: any) {
    console.log("System failure ....");
    ans.userMessage = newValue;
    //let rerun = 'n';
    rl.question("Do you want to rerun?", (rerun)=> {
        
        if (rerun.toLowerCase() === 'y') 
           start();
        else {
           console.clear();
           //process.exit();
        };
    }) 
}


function start() {
    console.clear();
    console.log("\x1b[32m%s\x1b[0m", "----------------------------------------------------------");
    console.log("\x1b[32m%s\x1b[0m" + "                Mars Rover Mission                    " + "\x1b[32m%s\x1b[0m", "|*", "*|");

    console.log("\x1b[32m%s\x1b[0m", "----------------------------------------------------------");
    let collisionPoints: CollisionPoints[] = [{ posX: -1, posY: -1}];
    rl.question('Enter plateau size: ', (answer) => {
        let ans = createPlateau(answer);
        if ('index' in ans) {
            console.log(ans.userMessage);
            reset(ans, '');
            // process.exit();
        }
        function addRover(ans: Plateau | ErrorMessage) {
            rl.question('Enter rover starting position and direction: ', (roverInput) => {
                if (!('index' in ans)){
                    let rover = createRover(roverInput, ans, collisionPoints);
                
                    if ('index' in rover) {
                        console.log(rover.userMessage);
                        reset(rover, '');
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

