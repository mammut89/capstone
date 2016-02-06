Template.productDetailsTable.helpers({
  productDetails: function() {
    var productId = Number(Iron.Location.get().path.split("/")[2]);
    var product = Polet.findOne({
      ProductNumber: productId
    });
    var tableData = [];

    _.each(product, function(value, key) {
      if (key !== '_id') {
        tableData.push({
          key: key,
          value: value
        });
      }
    });
    return tableData;
  }
});

Template.productDetails.helpers({
  productName: function() {
    var productId = Number(Iron.Location.get().path.split("/")[2]);
    var product = Polet.findOne({
      ProductNumber: productId
    });
    Session.set("Product", product);
    return product.ProductName;
  }
});

Template.productDetails.events({
  'click .js-add-to-cart': function(a , b , c) {
    var productId = Number(Iron.Location.get().path.split("/")[2]);
    var cart = Session.get("Cart");
    if(!cart) {
      cart = {};
    }
    if(cart[productId]){
      cart[productId] = cart[productId] + 1;
    } else {
      cart[productId] = 1;
    }

    Session.set("Cart", cart);
    var product = Session.get("Product");
    noty({
      text: 'Added ' + product.ProductName,
      type: 'success',
      timeout: 2000
    });
  }
});
