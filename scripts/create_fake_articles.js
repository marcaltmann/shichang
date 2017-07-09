const { MongoClient } = require('mongodb');
const faker = require('faker');

insertFakeDocuments(150000);

function insertFakeDocuments(num) {
  let promises = [];

  MongoClient.connect('mongodb://localhost:27017/shichang')
  .then((db) => {
    for (let i = 0; i < num; i++) {
      let document = {
        title: faker.commerce.productName(),
        content: faker.lorem.paragraph(),
        price: parseFloat(faker.commerce.price(), 10),
        color: faker.commerce.color(),
      };

      let promise = db.collection('articles').insertOne(document);
      promises.push(promise);

      if (i % 1000 === 0) {
        process.stdout.write('.');
      }
    }

    Promise.all(promises).then(() => {
      db.close();
      console.log('\n');
    });
  }, console.error);
}
