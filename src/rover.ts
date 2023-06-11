export interface Rover {
    x: number;
    y: number;
    direction: string;
}

export interface Plateau{
   width: number;
   depth: number;
}

export function createPlateau(width: number, depth: number) : Plateau{
  width++;
  depth++;
  return {width, depth};
}

export function createRover(x: number, y: number, direction: string): Rover {
  return { x, y, direction };
}

export function move(rover: Rover, command: string, plateau: Plateau): Rover {
  let newX = rover.x;
  let newY = rover.y;
  if (command === 'M') {
    
    switch (rover.direction){
      case 'N':
      newY = rover.y + 1;
      break;
    case 'E':
      newX = rover.x + 1;
      break;
    case 'S':
      newY = rover.y - 1;
      break;
    case 'W':
      newX = rover.x - 1;
      break;
    }
    if (newX >= 0 && newX < plateau.width && newY >= 0 && newY < plateau.depth) {
      return { ...rover, x: newX, y: newY };
    };
  }
  return rover;
  
} 


export function turnLeft(rover: Rover, command: string): Rover {
  if (command === 'L') {
    switch (rover.direction){
      case 'N':
        return { ...rover, direction: 'W' };
      case 'E':
        return { ...rover, direction: 'N' };
      case 'S':
        return { ...rover, direction: 'E' };
      case 'W':
        return { ...rover, direction: 'S' };
    }
  }
  return rover;
} 
export function turnRight(rover: Rover, command: string): Rover {
  if (command === 'R') {
    switch (rover.direction){
      case 'N':
        return { ...rover, direction: 'E' };
      case 'E':
        return { ...rover, direction: 'S' };
      case 'S':
        return { ...rover, direction: 'W' };
      case 'W':
        return { ...rover, direction: 'N' };
    }
  }
  return rover;
} 
