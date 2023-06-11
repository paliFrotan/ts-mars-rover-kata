import { createRover,
         move,
         createPlateau,
         turnLeft,
         turnRight,
         instructionsRover,
                 } from './rover';


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
    expect(rover.direction).toBe('W');
  });
});

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

  it('should turn Left if instructed', () => {
    let rover = createRover(0, 0, 'N');
    rover = turnLeft(rover, 'L');
    expect(rover.x).toBe(0);
    expect(rover.y).toBe(0);
    expect(rover.direction).toBe('W');

    rover = createRover(3, 4, 'E');
    rover = turnLeft(rover, 'L');
    expect(rover.x).toBe(3);
    expect(rover.y).toBe(4);
    expect(rover.direction).toBe('N');

    rover = createRover(5, 6, 'S');
    rover = turnLeft(rover, 'L');
    expect(rover.x).toBe(5);
    expect(rover.y).toBe(6);
    expect(rover.direction).toBe('E');

    rover = createRover(6, 6, 'W');
    rover = turnLeft(rover, 'L');
    expect(rover.x).toBe(6);
    expect(rover.y).toBe(6);
    expect(rover.direction).toBe('S');

  });

  it('should turn Right if instructed', () => {
    let rover = createRover(0, 0, 'N');
    rover = turnRight(rover, 'R');
    expect(rover.x).toBe(0);
    expect(rover.y).toBe(0);
    expect(rover.direction).toBe('E');

    rover = createRover(3, 4, 'E');
    rover = turnRight(rover, 'R');
    expect(rover.x).toBe(3);
    expect(rover.y).toBe(4);
    expect(rover.direction).toBe('S');

    rover = createRover(5, 6, 'S');
    rover = turnRight(rover, 'R');
    expect(rover.x).toBe(5);
    expect(rover.y).toBe(6);
    expect(rover.direction).toBe('W');

    rover = createRover(6, 6, 'W');
    rover = turnRight(rover, 'R');
    expect(rover.x).toBe(6);
    expect(rover.y).toBe(6);
    expect(rover.direction).toBe('N');

  });

});

describe('Input to 2 rovers and their output', () => {
  it('test for plateau 6x6 and 2 rover moves', () => {
    let plateau = createPlateau(5,5);
    let rover1 = createRover(1,2,'N');
    let rover2 = createRover(3,3, 'E');
    let instructionsRover1 = "LMLMLMLMM"
    let instructionsRover2 = "MMRMMRMRRM"
    expect(instructionsRover(rover1, plateau, instructionsRover1)).toBe("1 3 N");
    expect(instructionsRover(rover2, plateau, instructionsRover2)).toBe("5 1 E");
  });
});

