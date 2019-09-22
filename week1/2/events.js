const events = require('events');

const emitter = new events.EventEmitter();

emitter.on('end', console.log);
emitter.re

setTimeout(() => {
  emitter.emit('end', 'Hello!');
}, 5000);
