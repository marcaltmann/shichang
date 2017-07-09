const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
  findDocuments(req.query.q, (err, articles) => {
    if (err) {
      console.log(err);
    } else {
      let names = articles.map(article => article.name);

      res.render('search', {
        query: req.query.q,
        numResults: names.length,
        names,
      });
    }
  });
});

function findDocuments(query, callback) {
  MongoClient.connect('mongodb://localhost:27017/shichang')
  .then((db) => {
    db.collection('articles').find({ $text: { $search: query } })
    .toArray()
    .then((result) => {
      callback(undefined, result);
      db.close();
    }, callback);
  }, callback);
}

module.exports = router;
