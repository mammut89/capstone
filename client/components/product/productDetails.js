Template.productDetailsTable.helpers({
  productDetails: function() {
    var productId = Number(Iron.Location.get().path.split("/")[2]);
    var product = Polet.find({
      ProductNumber: productId
    }).fetch();
    var tableData = [];

    _.each(product[0], function(value, key) {
      if (key !== '_id' ) {
        tableData.push({
          key: key,
          value: value
        });
      }
    });
    return tableData;
  }
});
