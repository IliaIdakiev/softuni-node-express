const stream = require('stream');
const data = ['1', '2', '3', '4', null];

class MyReadableStream extends stream.Readable {
  constructor(opt) {
    super(opt);
  }

  _read() {
    data.forEach(item => this.push(item));
  }
}

class MyTransformStream extends stream.Transform {
  constructor(opt) {
    super(opt);
  }

  _transform(chunk, encoding, next) {
    const newChunk = `${parseInt(chunk) + 1}`;
    this.push(newChunk);
    next();
  }
}

class MyWritableStream extends stream.Writable {
  constructor(opt) {
    super(opt);
    this.result = '';
  }

  _write(chunk, encoding, next) {
    // if (encoding === 'Buffer') {
    //   // concat buffer;
    // } else if(encoding === 'string') {

    // }
    console.log(chunk.toString(), '_write', encoding);
    this.result += chunk;
    next();
  }
}

const read = new MyReadableStream();
const transform = new MyTransformStream();
const write = new MyWritableStream();

write.on('finish', function () {
  console.log(this.result);
});

read.pipe(transform).pipe(write);