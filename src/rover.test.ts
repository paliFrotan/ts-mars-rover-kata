import { createRover,
         move,
         createPlateau,
                 } from '../src/rover';

describe('Rover', () => {
  it('should be initialized with a starting position and direction', () => {
    let rover = createRover(0, 0, 'N');
    expect(rover.x).toBe(0);
    expect(rover.y).toBe(0);
    expect(rover.direction).toBe('N');

    rover = createRover(5, 5, 'W');
    expect(rover.x).toBe(5);
    expect(rover.y).toBe(5);
    expect(rover.direction).toBe('W');

  });

  it('should move forward in the direction it is facing', () => {
    let plateau = createPlateau(5,5);
    let rover = createRover(0, 0, 'N');
    rover = move(rover, 'M', plateau);
    expect(rover.x).toBe(0);
    expect(rover.y).toBe(1);

    rover = createRover(0, 0, 'E');
    rover = move(rover, 'M', plateau);
    expect(rover.x).toBe(1);
    expect(rover.y).toBe(0);

    rover = createRover(5, 5, 'S');
    rover = move(rover, 'M', plateau);
    expect(rover.x).toBe(5);
    expect(rover.y).toBe(4);

    rover = createRover(5, 5, 'W');
    rover = move(rover, 'M', plateau);
    expect(rover.x).toBe(4);
    expect(rover.y).toBe(5);
  });
});

describe('Plateau', () => {
    it('Plateau should be initialized with a width and depth', () => {
      let plateau = createPlateau(5,5);
      expect(plateau.width).toBe(6);
      expect(plateau.depth).toBe(6);
    });
});
describe('Check Move is within Plateau', () => {
  it('Cancel move if outside Plateau', () => {
    let plateau = createPlateau(5,5);
    expect(plateau.width).toBe(6);
    expect(plateau.depth).toBe(6);
    let rover = createRover(0, 0, 'W');
    rover = move(rover, 'M', plateau);
    expect(rover.x).toBe(0);
    expect(rover.y).toBe(0);
  });
});