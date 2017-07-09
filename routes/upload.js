const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();
const fs = require('fs');
const parse = require('csv-parse');
const { MongoClient } = require('mongodb');

/* POST csv upload */
router.post('/', upload.single('file'), function(req, res, next) {
  let file = req.file;
  let path = file.path;

  logCsvFile(path);

  res.send(`${req.file} respond with a resource`);
});

function logCsvFile(filePath) {
  fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      parse(data, { delimiter: ';' }, (err, output) => {
        let documents = makeDocuments(output);
        insertDocuments(documents);
      });
    }
  });
}

function makeDocuments(csvArrays) {
  let documents = [];
  let keys = csvArrays.shift();

  csvArrays.forEach((array) => {
    let doc = {};
    keys.forEach((key, i) => {
      doc[key] = array[i];
    });
    documents.push(doc);
  });

  return documents;
}

function insertDocuments(documents) {
  MongoClient.connect('mongodb://localhost:27017/shichang')
  .then((db) => {
    db.collection('articles').insertMany(documents)
    .then((result) => {
      console.log(result);
    });

    db.close();
  }, console.error);
}

module.exports = router;
