const io = require('./index').io;

/**
 * emits webpack progress percentage
 */
exports.emitPrecentage = (percentage, message) =>{
  io.emit("compiler_percentage", {
    percentage,
    message
  });
}

/**
 * emits webpack stats
 */
exports.emitStats = (status, data) => {
  io.emit("compiler_watch", {
    status,
    data
  });
}