const path = require('path');

console.log('Hello World');
console.log(__dirname, __filename);
console.log(path.basename(__filename));
console.log(path.extname(__filename));
console.log(path.join(__dirname, 'test','hello.html'));




