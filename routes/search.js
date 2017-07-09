const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
  findDocuments(req.query.q, (err, articles) => {
    let titles = articles.map(article => article.title);

    res.render('search', {
      query: req.query.q,
      numResults: titles.length,
      titles: titles,
    });
  });
});

function findDocuments(query, callback) {
  MongoClient.connect('mongodb://localhost:27017/shichang')
  .then((db) => {
    db.collection('articles').find({ $text: { $search: query } })
    .toArray()
    .then((result) => {
      callback(undefined, result);
    }, callback);

    db.close();
  }, callback);
}

module.exports = router;
