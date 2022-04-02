const RobotClass = require("./app/robot.js");
const Robot = new RobotClass();
const os = require("os"),
  stdin = process.stdin,
  stdout = process.stdout,
  stderr = process.stderr,
  EOL = os.EOL,
  fs = require("fs"),
  readline = require("readline");
dotenv = require("dotenv");
dotenv.config();
let rl, argv;

stdin.setEncoding("utf8");

argv = process.argv.slice(2);

// read stdin
stdin.on("data", (data) => {
  printMsg(data);
});

if (argv.length) {
  try {
    fs.accessSync(argv[0], fs.F_OK | fs.R_OK);
  } catch (e) {
    stderr.write(`file path not found ${argv[0]}`);
    process.exit();
  }

  stderr.write(`Reading commands from ${argv[0]}` + EOL);

  rl = readline.createInterface({
    input: fs.createReadStream(argv[0]),
    terminal: false,
  });

  rl.on("line", (line) => {
    stdout.write(line + EOL);
    printMsg(line);
  });

  rl.on("close", () => {
    rl.close();
    process.exit();
  });
}

const executeCommand = (order) => {
  let res;
  if (order.match(/^\s*place\s+\w+(?:,?\s*|\s+)\w+(?:,?\s*|\s+)\w+\s*$/i)) {
    const params = order
      .trim()
      .split(/(?:\s+|,\s*)/i)
      .slice(1);
    res = Robot.place(params[0], params[1], params[2]);
  } else if (order.match(/^move\s*$/i)) {
    res = Robot.move();
  } else if (order.match(/^left\s*$/i)) {
    res = Robot.left();
  } else if (order.match(/^right\s*$/i)) {
    res = Robot.right();
  } else if (order.match(/^report\s*$/i)) {
    res = Robot.report();
  } else {
    res = "Invalid Command";
  }
  return res;
};

const printMsg = (data) => {
  let res;
  const cmd = data.trim();

  if (cmd.match(/(q|quit|exit)/i)) process.exit();

  res = executeCommand(cmd);

  if (res instanceof Error) {
    stdout.write(`${res.message + EOL}> `);
  } else if (typeof res == "string") {
    stdout.write(`${res + EOL}> `);
  } else {
    stdout.write("> ");
  }
};

const App = () => { };

App.run = () => {
  stdout.write(
    `Hola! ${EOL} Start by Giving the Command - PLACE X, Y, F Eg: 1,1, South.` +
    EOL
  );
  stdin.resume();
};

App.run();
