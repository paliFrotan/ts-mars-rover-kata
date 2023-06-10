export interface Rover {
    x: number;
    y: number;
    direction: string;
}
  
  export function createRover(x: number, y: number, direction: string): Rover {
    return { x, y, direction };
  }

  export function move(rover: Rover, command: string): Rover {
    if (command === 'M') {
      switch (rover.direction){
        case 'N':
          return { ...rover, y: rover.y + 1 };
        case 'E':
          return { ...rover, x: rover.x + 1 };
        case 'S':
          return { ...rover, y: rover.y - 1 };
        case 'W':
          return { ...rover, x: rover.x - 1 };
      }
    }

    return rover;
  }