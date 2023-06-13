import { createRover,
         move,
         createPlateau,
         turnLeft,
         turnRight,
         instructionsRover,
                 } from './rover';


describe('Plateau', () => {
  it('Plateau should be initialized with a width and depth', () => {
    let plateau = createPlateau("5 5");
    if ('width' in plateau) {
      // plateau is of type Plateau
      expect(plateau.width).toBe(6);
      expect(plateau.depth).toBe(6);
    } else {
      // plateau is of type ErrorMessage
      expect(plateau.userMessage).toBe({ index: 1, userMessage :'Invalid sizeString format. Expected format: "x y" where x and y are numbers.'});
    }

    
  });
});

describe('Check Move is within Plateau', () => {
  it('Cancel move if outside Plateau', () => {
    let plateau = createPlateau("5 5");
    if ('width' in plateau) {
      // plateau is of type Plateau
      expect(plateau.width).toBe(6);
      expect(plateau.depth).toBe(6);
      let rover = createRover('0 0 W');
      if('x' in rover){
        rover = move(rover, 'M', plateau);
        if('x' in rover){
          expect(rover.x).toBe(0);
          expect(rover.y).toBe(0);
          expect(rover.direction).toBe('W');
        }
      }
    } else {
      // plateau is of type ErrorMessage
      expect(plateau.userMessage).toBe({ index: 1, userMessage :'Invalid sizeString format. Expected format: "x y" where x and y are numbers.'});
    }
    
  });
});

describe('Rover', () => {
  it('should be initialized with a starting position and direction', () => {
    let rover = createRover('0 0 N');
    if ('x' in rover){
      expect(rover.x).toBe(0);
      expect(rover.y).toBe(0);
      expect(rover.direction).toBe('N');
    }
    rover = createRover('5 5 W');
    if ('x' in rover){
      expect(rover.x).toBe(5);
      expect(rover.y).toBe(5);
      expect(rover.direction).toBe('W');
    }

  });

  it('should move forward in the direction it is facing', () => {
    let plateau = createPlateau("5 5");
    if ('width' in plateau) {
      // plateau is of type Plateau
      expect(plateau.width).toBe(6);
      expect(plateau.depth).toBe(6);
      let rover = createRover('0 0 N');
      if ('x' in rover){
        rover = move(rover, 'M', plateau);
        if ('x' in rover){
          expect(rover.x).toBe(0);
          expect(rover.y).toBe(1);
        }
      }
      rover = createRover('0 0 E');
      if ('x' in rover){
        rover = move(rover, 'M', plateau);
        if ('x' in rover){
          expect(rover.x).toBe(1);
          expect(rover.y).toBe(0);
        }
      }
      

      rover = createRover('5 5 S');
      if ('x' in rover){
        rover = move(rover, 'M', plateau);
        if ('x' in rover){
          expect(rover.x).toBe(5);
          expect(rover.y).toBe(4);
        }
      }

      rover = createRover('5 5 W');
      if ('x' in rover){
        rover = move(rover, 'M', plateau);
        if ('x' in rover){
          expect(rover.x).toBe(4);
          expect(rover.y).toBe(5);
        }
      }

    } else {
      // plateau is of type ErrorMessage
      expect(plateau.userMessage).toBe({ index: 1, userMessage :'Invalid sizeString format. Expected format: "x y" where x and y are numbers.'});
    }
    
  });

  it('should turn Left if instructed', () => {
    let rover = createRover('0 0 N');
    if ('x' in rover){
      rover = turnLeft(rover, 'L');
      expect(rover.x).toBe(0);
      expect(rover.y).toBe(0);
      expect(rover.direction).toBe('W');
    }
    rover = createRover('3 4 E');
    if ('x' in rover){
      rover = turnLeft(rover, 'L');
      expect(rover.x).toBe(3);
      expect(rover.y).toBe(4);
      expect(rover.direction).toBe('N');
    }

    rover = createRover('5 6 S');
    if ('x' in rover){
      rover = turnLeft(rover, 'L');
      expect(rover.x).toBe(5);
      expect(rover.y).toBe(6);
      expect(rover.direction).toBe('E');
    }

    rover = createRover('6 6 W');
    if ('x' in rover){
      rover = turnLeft(rover, 'L');
      expect(rover.x).toBe(6);
      expect(rover.y).toBe(6);
      expect(rover.direction).toBe('S');
    }
  });

  it('should turn Right if instructed', () => {
    let rover = createRover('0 0 N');
    if ('x' in rover){
      rover = turnRight(rover, 'R');
      expect(rover.x).toBe(0);
      expect(rover.y).toBe(0);
      expect(rover.direction).toBe('E');
    }
    rover = createRover('3 4 E');
    if ('x' in rover){
      rover = turnRight(rover, 'R');
      expect(rover.x).toBe(3);
      expect(rover.y).toBe(4);
      expect(rover.direction).toBe('S');
    }
    rover = createRover('5 6 S');
    if ('x' in rover) {
      rover = turnRight(rover, 'R');
      expect(rover.x).toBe(5);
      expect(rover.y).toBe(6);
      expect(rover.direction).toBe('W');
    }
    rover = createRover('6 6 W');
    if ('x' in rover){
      rover = turnRight(rover, 'R');
      expect(rover.x).toBe(6);
      expect(rover.y).toBe(6);
      expect(rover.direction).toBe('N');
    }
  });

});

describe('Input to 2 rovers and their output', () => {
  it('test for plateau 6x6 and 2 rover moves', () => {
    let plateau = createPlateau("5 5");
    if ('width' in plateau) {
      // plateau is of type Plateau
      expect(plateau.width).toBe(6);
      expect(plateau.depth).toBe(6);
      let rover1 = createRover('1 2 N');
      if ('x' in rover1){
        let execute = instructionsRover(rover1, plateau, "LMLMLMLMM");
        expect(execute).toBe("1 3 N");
      } else {
        expect(rover1.userMessage).toBe('Invalid roverString format. Expected format: "x y d" where x and y are numbers and d is one of "N", "E", "S", "W".');
      }
      let rover2 = createRover('3 3 E');
      if ('x' in rover2){
        expect(instructionsRover(rover2, plateau, "MMRMMRMRRM")).toBe("5 1 E");
      } else {
        expect(rover2.userMessage).toBe('Invalid roverString format. Expected format: "x y d" where x and y are numbers and d is one of "N", "E", "S", "W".');
      }
      let rover3 = createRover('3 4 E');
      if ('x' in rover3){
        let execute = instructionsRover(rover3, plateau, "MMMMMMMM");
        expect(execute).toEqual({index: 3,userMessage: 'Rover@(5,4) not moved since out of bounds of plateau.'});
      } else {
        expect(rover3.userMessage).toBe('Invalid roverString format. Expected format: "x y d" where x and y are numbers and d is one of "N", "E", "S", "W".');
      }
    } else {
      // plateau is of type ErrorMessage
      expect(plateau.userMessage).toBe('Invalid sizeString format. Expected format: "x y" where x and y are numbers.');
    };

  });
});


