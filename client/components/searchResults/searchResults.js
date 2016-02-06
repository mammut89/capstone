Template.searchResults.helpers({
  searchString: function(){
    return Session.get('searchString');
  }
});

Template.searchResultsTable.helpers({
    searchResults: function(){
      var searchString = Session.get('searchString');
      var products = Polet.find({"ProductName" : {$regex : ".*" + searchString + ".*"}}).fetch();
      var tableData = [];
      _.each(products, function(product){
        tableData.push({
          productId : product.ProductNumber,
          productName : product.ProductName,
          price : product.Price
        });
      });


    //  return Session.get('searchString');
    return tableData;
    }
  });
