class Robot {
  constructor() {
    this.directions = ["NORTH", "EAST", "SOUTH", "WEST"];
    this.grid = {
      startPointX: 0,
      startPointY: 0,
      lengthX: 5,
      lengthY: 5,
    };

    this.roboCurrentPosition = {
      x: undefined,
      y: undefined,
      f: undefined,
    };
    this.isRoboPlaced = false;
  }

  isOutOfGrid = (x, y) => {
    if (
      x > this.grid.startPointX + (this.grid.lengthX - 1) ||
      x < this.grid.startPointX ||
      y > this.grid.startPointY + (this.grid.lengthY - 1) ||
      y < this.grid.startPointY
    ) {
      return true;
    } else return false;
  };

  validate = (x, y, facing) => {
    if (!facing) {
      return "Invalid Direction";
    }

    const f = facing.toUpperCase(),
      xA = parseInt(x),
      yA = parseInt(y);

    if (xA < 0 || yA < 0) {
      return "No negative values";
    }

    if (!this.isDirectionValid(f)) {
      return "Invalid Direction";
    }

    return {
      x: xA,
      y: yA,
      f,
    };
  };

  isDirectionValid = (face) => {
    return this.directions.indexOf(face) !== -1;
  };

  setPosition = function (x, y, f) {
    (this.roboCurrentPosition.x = x),
      (this.roboCurrentPosition.y = y),
      (this.roboCurrentPosition.f = this.directions.indexOf(f));
  };

  getPosition = () => {
    return {
      x: this.roboCurrentPosition.x,
      y: this.roboCurrentPosition.y,
      f: this.directions[this.roboCurrentPosition.f],
    };
  };

  place = (x, y, f) => {
    let arg = {};

    arg = this.validate(x, y, f);

    if (!arg.x && !arg.y && !arg.f) {
      return arg
    }

    if (this.isOutOfGrid(arg.x, arg.y)) {
      return "Robot moving out of grid give the correct command";
    }

    this.setPosition(arg.x, arg.y, arg.f);

    if (!this.isRoboPlaced) this.isRoboPlaced = true;

    return "Robo placed at: " + arg.x + "," + arg.y + "," + arg.f;
  };

  move = () => {
    let x, y, f;

    if (!this.isRoboPlaced) {
      return "PLACE the robot first";
    }

    x = this.roboCurrentPosition.x;
    y = this.roboCurrentPosition.y;
    f = this.roboCurrentPosition.f;

    switch (f) {
      case 0: // NORTH
        ++y;
        break;
      case 1: // EAST
        ++x;
        break;
      case 2: // SOUTH
        --y;
        break;
      case 3: // WEST
        --x;
        break;
    }

    if (this.isOutOfGrid(x, y)) {
      return "Robot moving out of grid give the correct command";
    }

    this.setPosition(x, y, this.directions[f]);

    return "Robo moved to: " + x + "," + y + "," + this.directions[f];
  };

  right = () => {
    if (!this.isRoboPlaced) {
      return "PLACE the robot first";
    }
    this.roboCurrentPosition.f =
      this.roboCurrentPosition.f + 1 > 3 ? 0 : this.roboCurrentPosition.f + 1;
    return "Robo moved to: " + this.roboCurrentPosition.x + "," + this.roboCurrentPosition.y + "," + this.directions[this.roboCurrentPosition.f];
  };

  left = () => {
    if (!this.isRoboPlaced) {
      return "PLACE the robot first";
    }
    this.roboCurrentPosition.f =
      this.roboCurrentPosition.f - 1 < 0 ? 3 : this.roboCurrentPosition.f - 1;
    return "Robo moved to: " + this.roboCurrentPosition.x + "," + this.roboCurrentPosition.y + "," + this.directions[this.roboCurrentPosition.f];
  };

  report = () => {
    const currentPos = this.getPosition();

    if (
      currentPos.x == undefined &&
      currentPos.y == undefined &&
      currentPos.f == undefined
    ) {
      return "PLACE the robot first";
    } else {
      return (
        "Output: " + currentPos.x + "," + currentPos.y + "," + currentPos.f
      );
    }
  };
};

module.exports = Robot;