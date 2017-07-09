const parse = require('csv-parse');

let input = '#Welcome\n"1","2","3","4"\n"a","b","c","d"';

parse(input, {comment: '#'}, (err, output) => {
  console.log(output);
});
