const { spawn } = require("child_process");
const readline = require("readline");

/**
 * Register commands to client and spawn them when client wants to
 * @param {Array} commands - An array of all commands to register. Like this: ['ls -lh /usr', 'git status'].
 * @param {Class} socket - Internal: the server socket that connects plugin to server command.
 */
module.exports = (commands, socket) => {
  if (!commands) return false; // we don't have any commands to run
  let runningCommands = [];

  // register the commands to the client
  socket.emit("custom_command_register_all", {
    commands
  });

  // client requests to run command:
  socket.on("custom_command_run", browserData => {
    if (runningCommands[browserData.command]) return false;
    try {
      // prepare cmd to be accepted by spawn()
      const cmd = browserData.command;
      _cmd = cmd.split(" "); // 'ls -lh /usr' => ['ls', '-lh', '/usr']
      _cmd_first = _cmd.shift(); // ['ls', '-lh', '/usr'] => 'ls' && cmd == ['-lh', '/usr']

      console.log(`[JARVIS] starting command ${cmd}...`);
      const proc = spawn(_cmd_first, _cmd);

      // add command to runningcommands
      runningCommands[cmd] = true;

      // handle normal output by command
      proc.stdout.on("data", data => false);
      readline
        .createInterface({
          input: proc.stdout,
          terminal: true
        })
        .on("line", line => {
          socket.emit("custom_command_data", {
            command: cmd,
            data: line
          });
        });

      // handle error output that doesn't break the script by command
      proc.stderr.on("data", error => false);
      readline
        .createInterface({
          input: proc.stderr,
          terminal: true
        })
        .on("line", line => {
          socket.emit("custom_command_error", {
            command: cmd,
            error: `${error}`
          });
        });

      // handle errors that actually caused the command to crash
      proc.on("error", error => {
        socket.emit("custom_command_critical_error", {
          command: cmd,
          error: `${error}`
        });
      });

      // handle if command exits
      proc.on("close", code => {
        runningCommands[cmd] = false;
        socket.emit("custom_command_exit", {
          command: cmd,
          code: `${code}`
        });
      });
    } catch (error) {
      console.error(`[JARVIS] Error spawning command in node: ${error}`);

      runningCommands[cmd] = false;
      socket.emit("custom_command_critical_error", {
        command: cmd,
        error: `Error spawning process within node: ${error}`
      });
      socket.emit("custom_command_exit", {
        command: cmd,
        code: 1
      });
    }
  });
};
