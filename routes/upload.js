const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();
const fs = require('fs');
const parse = require('csv-parse');

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
        console.log(output);
      });
    }
  });
}

module.exports = router;
