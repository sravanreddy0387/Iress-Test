const RobotClass = require("../app/robot.js");

describe('Toy Robot', () => {
    let Robot;

    beforeEach(() => {
        Robot = new RobotClass()
    })

    it('Positons should be undefined at start', () => {
        const position = Robot.getPosition();
        expect(position.x === undefined && position.y === undefined && position.f === undefined).toBe(true);
    });

    it('It should say PLACE the robot first', () => {
        expect(Robot.report()).toEqual('PLACE the robot first');
    });

    it('It should say "Invalid Direction" if direction is undefined or invalid', () => {
        const x = 0,
            y = 0;
        let f;
        expect(Robot.place(x, y, f)).toEqual('Invalid Direction');
    });


    it('It should say "Invalid Direction" if positions are negative values', () => {
        const x = -1,
            y = -1,
            f = 'SOUTH';
        expect(Robot.place(x, y, f)).toEqual('No negative values');
    });

    it('It should report its position', () => {
        const x = 1,
            y = 2;
        let f = 'EAST';
        Robot.place(x, y, f);
        expect(Robot.report()).toEqual("Output: " + x + "," + y + "," + f);
    });

    it('It should report its position', () => {
        const x = 1,
            y = 2,
            f = 'EAST';
        Robot.place(x, y, f);
        expect(Robot.report()).toEqual("Output: " + x + "," + y + "," + f);
    });

    it('It should not place out of grid', () => {
        const x = 1,
            y = 7,
            f = 'EAST';
        expect(Robot.place(x, y, f)).toEqual("Robot moving out of grid give the correct command");
    });

    it('It should not move before placing', () => {
        expect(Robot.move()).toEqual("PLACE the robot first");
    });

    it('It should move correctly', () => {
        const x = 1,
            y = 1,
            f = 'EAST';
        Robot.place(x, y, f);
        expect(Robot.move()).toEqual("Robo moved to: " + (x + 1) + "," + y + "," + f);
    });

    it('It should place move report correctly', () => {
        const x = 0,
            y = 0,
            f = 'NORTH';
        Robot.place(x, y, f);
        Robot.move();
        const position = Robot.getPosition();
        expect(Robot.report()).toEqual("Output: " + position.x + "," + position.y + "," + position.f);
    });

})