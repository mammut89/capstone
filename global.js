Polet = new Meteor.Collection("Polet");

ProductIndex = new EasySearch.Index({
    collection: Polet,
    fields: ['ProductName'],
    engine: new EasySearch.MongoDB()
  });
