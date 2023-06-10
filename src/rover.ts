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
      if (rover.direction === 'N') {
        return { ...rover, y: rover.y + 1 };
      } else if (rover.direction === 'E') {
        return { ...rover, x: rover.x + 1 };
      }
    }
    return rover;
  }