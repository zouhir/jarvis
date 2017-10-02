const { EventEmitter } = require('events');

const compilerEmitter = new EventEmitter();

module.exports = {
  emitProgress: (percentage, message) => {
    compilerEmitter.emit('progress', percentage, message);
  },
  emitStats:(stats) => {
    compilerEmitter.emit('stats', stats);
  },
  listener: compilerEmitter
}