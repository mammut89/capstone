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
    return product.ProductName;
  }
});
