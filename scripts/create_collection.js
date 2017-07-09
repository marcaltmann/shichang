const { MongoClient } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/shichang')
.then((db) => {
  db.createCollection('articles')
  .then((collection) => {
    collection.createIndex()


    db.close();
  });
}, console.error);
