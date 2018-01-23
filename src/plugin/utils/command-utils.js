const { spawn } = require("child_process");

/**
 * Loop through commands and spawn a child process for each of them.
 * @param {Array} commands - An array of all commands to spawn. Like this: ['ls -lh /usr', 'git status'].
 * @param {Class} socket . Internal: the server socket that connects plugin to server command.
 */
module.exports = (commands, socket) => {
  if (!commands) return false; // we don't have any commands to run

  commands.forEach(cmd => {
    // prepare cmd to be accepted by spawn()
    _cmd = cmd.split(" "); // 'ls -lh /usr' => ['ls', '-lh', '/usr']
    _cmd_first = _cmd.shift(); // ['ls', '-lh', '/usr'] => 'ls' && cmd == ['-lh', '/usr']

    // spawn actual command
    const proc = spawn(_cmd_first, _cmd);

    // handle normal output by command
    proc.stdout.on("data", data => {
      socket.emit("custom_command_data", {
        command: cmd,
        data
      });
    });

    // handle error output by command
    proc.stderr.on("data", error => {
      socket.emit("custom_command_error", {
        command: cmd,
        error
      });
    });

    // handle if command exits
    proc.on("close", code => {
      socket.emit("custom_command_exit", {
        command: cmd,
        code
      });
    });
  });
};
