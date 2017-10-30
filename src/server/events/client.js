const compilerEvents = require("./compiler");

const emitter = io => {
  let _lastProgress = {};
  let _lastStats = {};
  /**
   * emits webpack progress percentage
   */
  compilerEvents.listener.on("progress", (percentage, message) => {
    _lastProgress = { percentage, message };
    io.emit("progress", {
      percentage,
      message
    });
  });

  /**
   * emits webpack stats
   */
  compilerEvents.listener.on("stats", function(report) {
    _lastStats = report;
    io.emit("stats", report);
  });

  io.on("connection", function() {
    io.emit("progress", {
      percentage: _lastProgress.percentage,
      message: _lastProgress.message
    });
    io.emit("stats", _lastStats);
  });
};

module.exports = emitter;
