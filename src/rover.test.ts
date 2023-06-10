import { createRover,
         move,
                 } from '../src/rover';

describe('Rover', () => {
  it('should be initialized with a starting position and direction', () => {
    const rover = createRover(0, 0, 'N');
    expect(rover.x).toBe(0);
    expect(rover.y).toBe(0);
    expect(rover.direction).toBe('N');
  });

  it('should move forward in the direction it is facing', () => {
    let rover = createRover(0, 0, 'N');
    rover = move(rover, 'M');
    expect(rover.x).toBe(0);
    expect(rover.y).toBe(1);

    rover = createRover(0, 0, 'E');
    rover = move(rover, 'M');
    expect(rover.x).toBe(1);
    expect(rover.y).toBe(0);
  });
});