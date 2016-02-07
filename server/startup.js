
Meteor.methods({
  'getProductName': function(id) {
    return Polet.findOne({
      ProductNumber: id
    });
  }
});

Meteor.startup(function() {
  if (!Polet.findOne()) {
    console.log("no products yet... creating from filesystem");
    var fs = Meteor.npmRequire('fs');
    var files = fs.readdirSync('./assets/app/');
    var filename = 'vinmonopolet.json';
    var poletArray = JSON.parse(Assets.getText(filename));

    for (var k = 0; k < poletArray.length; k++) {
      var product = poletArray[k];
      var filteredProduct = {};

      filteredProduct.ProductNumber = product.Varenummer;
      filteredProduct.ProductName = product.Varenavn;
      filteredProduct.Volume = product.Volum;
      filteredProduct.Price = product.Pris;
      filteredProduct.LiterPrice = product.Literpris;
      filteredProduct.ProductType = product.Varetype;
      filteredProduct.Fullness = product.Fylde;
      filteredProduct.Freshness = product.Friskhet;
      filteredProduct.Tannin = product.Garvestoffer;
      filteredProduct.Bitterness = product.Bitterhet;
      filteredProduct.Sweetness = product.Sodme;
      filteredProduct.Year = product.Argang;
      filteredProduct.Alcohol = product.Alkohol;
      filteredProduct.Sugar = product.Sukker;
      filteredProduct.Acid = product.Syre;

      Polet.insert(filteredProduct);
    }
  }
});
