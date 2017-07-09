function adapter(fairmondoDocument) {
  let document = {
    name:        fairmondoDocument.title,
    description: fairmondoDocument.content,
    price:       fairmondoDocument.price_cents / 100,
  };

  return document;
}

module.exports = adapter;
