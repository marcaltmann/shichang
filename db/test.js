const { MongoClient } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/shichang')
.then((db) => {
  db.collection('test').insertOne({
    name: 'Marc',
    age: 27,
  })
  .then((result) => {
    console.log(result);
  });

  db.close();
}, console.error);
