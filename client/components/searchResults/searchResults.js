Template.searchResults.helpers({
  searchString: function() {
    return Session.get('searchString');
  },
  inputAttributes: function() {
    return {
      'class': 'easy-search-input',
      'placeholder': 'Start searching...',
      'value': Session.get('searchString')
    };
  },
  productIndex: function() {
    return ProductIndex;
  }
});

Template.searchResultsTable.helpers({
  searchResults: function() {
    var searchString = Session.get('searchString');
    var products = ProductIndex.search(searchString, {}).fetch()

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
  },
  productIndex: function() {
    return ProductIndex;
  },
  filtered: function(product) {
    var Searchfilter = Session.get("Searchfilter") || {};
    var criterias = {
      'volumeFrom': true,
      'volumeTo': true
    };

    if (Searchfilter.volumeFrom) {
      if (this.Volume < Searchfilter.volumeFrom) {
        criterias.volumeFrom = false;
        return false;
      }
    }
    if (Searchfilter.volumeTo) {
      if (this.Volume > Searchfilter.volumeTo) {
        criterias.volumeTo = false;
        return false;
      }
    }
    return !_.contains(_.values(criterias), false);
  }
});

Template.searchResultsTable.events({
  'click .js-add-to-cart': function(event, template) {
    var productId = Number(event.currentTarget.id);
    var cart = Session.get("Cart");
    if (!cart) {
      cart = {};
    }
    if (cart[productId]) {
      cart[productId] = cart[productId] + 1;
    } else {
      cart[productId] = 1;
    }

    Session.setPersistent("Cart", cart);
    var nodeHtml = template.$('a[href$=' + productId + ']').html();
    var productName = nodeHtml.replace("&nbsp;&nbsp;&nbsp;", " ");
    noty({
      text: 'Added ' + productName,
      type: 'success',
      timeout: 2000
    });
  }
});

Template.searchResults.events({
  'change .category-filter': function(e) {
    ProductIndex.getComponentMethods()
      .addProps('categoryFilter', $(e.target).val());
    ProductIndex.getComponentMethods()
      .addProps('minScore', 0.8);
  },
  'change .js-volume-from': function(e) {
    var Searchfilter = Session.get("Searchfilter") || {};
    Searchfilter.volumeFrom = $(e.target).val();
    Session.set("Searchfilter", Searchfilter);
  },
  'change .js-volume-to': function(e) {
    var Searchfilter = Session.get("Searchfilter") || {};
    Searchfilter.volumeTo = $(e.target).val();
    Session.set("Searchfilter", Searchfilter);
  }
});
