const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

/* POST deleteall */
router.post('/', function(req, res, next) {
  deleteDocuments();

  res.redirect('/');
});

function deleteDocuments() {
  MongoClient.connect('mongodb://localhost:27017/shichang')
  .then((db) => {
    db.collection('articles').drop()
    .then((result) => {
      console.log(result);
      db.close();
    }, console.error);
  }, console.error);
}

module.exports = router;
