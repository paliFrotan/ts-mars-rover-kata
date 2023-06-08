import { createRover } from '../src/rover';

describe('Rover', () => {
  it('should be initialized with a starting position and direction', () => {
    const rover = createRover(0, 0, 'N');
    expect(rover.x).toBe(0);
    expect(rover.y).toBe(0);
    expect(rover.direction).toBe('N');
  });
});