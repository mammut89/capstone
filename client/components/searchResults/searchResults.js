Template.searchResults.helpers({
  searchString: function() {
    return Session.get('searchString');
  }
});

Template.searchResultsTable.helpers({
  searchResults: function() {
    var searchString = Session.get('searchString');
    var products = Polet.find({
      "ProductName": {$regex: ".*" + searchString + ".*"}
    }).fetch();
    var tableData = [];
    _.each(products, function(product) {
      tableData.push({
        productId: product.ProductNumber,
        productName: product.ProductName,
        price: product.Price,
        volume: product.Volume,
        productType: product.ProductType
      });
    });
    return tableData;
  }
});

Template.searchResultsTable.events({
  'click .js-add-to-cart': function(event, template) {
    var productId = Number(event.currentTarget.id);
    var cart = Session.get("Cart");
    if(!cart) {
      cart = {};
    }
    if(cart[productId]){
      cart[productId] = cart[productId] + 1;
    } else {
      cart[productId] = 1;
    }

    Session.setPersistent("Cart", cart);
    var nodeHtml = template.$('a[href$=' + productId + ']').html();
    var productName = nodeHtml.replace("&nbsp;&nbsp;&nbsp;", " ") ;
    noty({
      text: 'Added ' + productName,
      type: 'success',
      timeout: 2000
    });
  }
});
