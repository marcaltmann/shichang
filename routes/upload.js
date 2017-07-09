const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();
const fs = require('fs');
const parse = require('csv-parse');
const { MongoClient } = require('mongodb');

const fairmondoConverter = require('../app/converters/fairmondo');
const fairmondoAdapter = require('../app/adapters/fairmondo');

/* POST csv upload */
router.post('/', upload.single('file'), function(req, res, next) {
  let file = req.file;
  let path = file.path;

  convertCsvFile(path);

  res.redirect('/');
});

function convertCsvFile(filePath) {
  fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);

      let fairmondoDocuments = fairmondoConverter(data);
      /* convert to our format */
      let documents = fairmondoDocuments.map(document => fairmondoAdapter(document));

      insertDocuments(documents);
    }
  });
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
