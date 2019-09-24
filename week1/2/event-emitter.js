// // rest
// function test(first, ...args) {
//   // first === 1;
//   // args === [2,3,4];
// }

// test(1, 2, 3, 4);


class EventEmitter {

  constructor() {
    this.subscriptions = {};
  }

  on(eventName, cb) {
    this.subscriptions[eventName] =
      (this.subscriptions[eventName] || []).concat([cb]);

    // same as 
    // if (!this.subscriptions[eventName]) {
    //   this.subscriptions[eventName] = [];
    // }
    // this.subscriptions[eventName] = this.subscriptions[eventName].concat([cb]);
    // or this.subscriptions[eventName].push(cb); // this mutates the existing array

    // const cbIndex = this.subscriptions[eventName].length - 1;
    return () => {

      // spread/rest operator - ...
      const index = this.subscriptions[eventName].findIndex(item => item === cb);
      this.subscriptions[eventName].splice(index, 1);

      // this.subscriptions[eventName] = [
      //   ...this.subscriptions[eventName].slice(0, cbIndex),
      //   ...this.subscriptions[eventName].slice(cbIndex + 1)
      // ];

      // same as
      // this.subscriptions[eventName].slice(0, cbIndex)
      //   .concat(this.subscriptions[eventName].slice(cbIndex + 1));
    }
  }

  once(eventName, cb) {
    const unsub = this.on(eventName, data => {
      cb(data);
      unsub();
    });
  }

  emit(eventName, data) {
    (this.subscriptions[eventName] || []).forEach(cb => {
      cb(data);
    });
  }
}

const emitter = new EventEmitter();
// const unsub = emitter.on('getData', console.log);
// emitter.on('sendData', data => console.log(data));
// emitter.on('getData', data => console.log(data));
emitter.on('getData', console.log);
emitter.once('getData', console.log);
emitter.once('getData', console.log);
emitter.emit('getData', 'Testing...');
emitter.emit('getData', '123');
// // unsub();
// // console.log('------------------------')
// emitter.once('getData', console.log);
// emitter.emit('getData', 'Testing...');