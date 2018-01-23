const { spawn } = require("child_process");

/**
 * Loop through commands and spawn a child process for each of them.
 * @param {Array} commands - An array of all commands to spawn. Like this: ['ls -lh /usr', 'git status'].
 * @param {Class} socket . Internal: the server socket that connects plugin to server command.
 */
module.exports = (commands, socket) => {
  if (!commands) return false; // we don't have any commands to run
  let runningCommands = [];

  commands.forEach(cmd => {
    // try to register command
    try {
      // register the command to the client
      socket.emit("custom_command_register", {
        command: cmd
      });

      // catch any unexpected errors
    } catch (error) {
      console.error(`[JARVIS] Error registering command to browser: ${error}`);
    }
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
      proc.stdout.on("data", data => {
        socket.emit("custom_command_data", {
          command: cmd,
          data: `${data}`
        });
      });

      // handle error output that doesn't break the script by command
      proc.stderr.on("data", error => {
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
