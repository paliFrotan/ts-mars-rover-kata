export interface Rover {
    x: number;
    y: number;
    direction: string;
}
  
  export function createRover(x: number, y: number, direction: string): Rover {
    return { x, y, direction };
  }