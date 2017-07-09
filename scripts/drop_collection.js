const { MongoClient } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/shichang')
.then((db) => {
  db.dropCollection('articles')
  .then(() => {
    db.close();
  });
}, console.error);
