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
 


let collisionPoints: CollisionPoints[] = [{ posX: -1, posY: -1}];
let ans: void|ErrorMessage|Plateau;
let ansR: void|string;
let rover: void|ErrorMessage|Rover;

function start() {
    console.clear();
    console.log('\x1b[38;5;206m' + "----------------------------------------------------------" + '\x1b[0m');
    console.log('\x1b[38;5;206m' + "|*" + '\x1b[0m' + "                Mars Rover Mission                    " + '\x1b[38;5;206m' + "*|" + '\x1b[0m');
    console.log('\x1b[38;5;206m' + "----------------------------------------------------------" + '\x1b[0m');
    
    areaPlateau();
}
    

function areaPlateau(){
    return rl.question('Enter plateau size: ', plateauInput); 
}

function plateauInput(answer: void|string){
    if (answer){
        ans = createPlateau(answer);
        if ('index' in ans) {
            console.log(ans.userMessage);
            if(ans.index === 2 || ans.index === 1) 
                return rl.question('Enter plateau size: ', plateauInput);
        }
    }
    return rl.question('Enter rover starting position and direction: ', addRover);
}
function addRover(ansR: void |string){ 
    if (ansR && ans) {
        if('width' in ans){
            rover = createRover(ansR, ans, collisionPoints);
            if('index' in rover){
                console.log(rover.userMessage);
                return rl.question('Enter rover starting position and direction: ', addRover);
            }
            return rl.question('Enter instructions: ', followInstructions);
        }
    } 
    
}
function followInstructions(ansI: void | string){
    if (rover && ans && ansI){
        if ('x' in rover && 'width' in ans) {
            let newPosition = instructionsRover(rover, ans, ansI, collisionPoints);
            console.log("Rover moved to: ", newPosition);
        }
    }
    rl.question('Add another rover? (y/n): ', addAnother);
}

function addAnother(answer: string) {
      answer = answer.toLowerCase();
      switch (answer){
        case "y":
            return rl.question('Enter rover starting position and direction: ', addRover);
        case "n":
            console.clear();
            return start();
        default:
            return rl.question('Add another rover? (y/n): ', addAnother);
      }
}                   

start();


