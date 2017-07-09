const parse = require('csv-parse');

const schema = {
  title: ['name', 'string'],
  content: ['description', 'string'],
  price: ['price_cents', 'price_cents'],
}

function parseCsv(data, callback) {
  parse(data, { delimiter: ';' }, (err, output) => {
    let documents = makeDocuments(output);
    callback(documents);
  });
}

function makeDocuments(csvArrays) {
  let documents = [];
  csvArrays.shift();

  let useColumns = [];


  csvArrays.forEach((array) => {
    let doc = {};
    array.forEach((arrayPart) => {


      let key = schemaPart[0];
      let dataType = schemaPart[1];
      let value = array[i];

      let convertedValue;
      switch(dataType) {
      case 'number':
        convertedValue = parseInt(value, 10);
        break;
      case 'bool':
        if (value === 'true') {
          convertedValue = true;
        } else {
          convertedValue = false;
        }
        break;
      case 'array':
        convertedValue = value.split(',');
        convertedValue = convertedValue.map(v => parseInt(v, 10));
        break;
      case 'price_cents'
      case 'string':
      default:
        convertedValue = value;
      }

      doc[key] = convertedValue;
    });
    documents.push(doc);
  });

  return documents;
}

module.exports = router;
