Template.searchForm.helpers({
  inputAttributes: function() {
    return {
      'class': 'easy-search-input input',
      'placeholder': 'Start searching...',
      'value': Session.get('searchString'),
    };
  },
  productIndex: function() {
    return ProductIndex;
  }
});

Template.searchResultsTable.rendered = function() {
  var category = Session.get("Category");
  if(category){
    $("#category").val(category).trigger('change');
  }

  var volumeFrom = $('.js-volume-from input').val();
  var volumeTo = $('.js-volume-to input').val();
  var priceFrom = $('.js-price-from input').val();
  var priceTo = $('.js-price-to input').val();

  ProductIndex.getComponentMethods().addProps('volumeFrom', volumeFrom);
  ProductIndex.getComponentMethods().addProps('volumeTo', volumeTo);
  ProductIndex.getComponentMethods().addProps('priceFrom', priceFrom);
  ProductIndex.getComponentMethods().addProps('priceTo', priceTo);
};

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

Template.searchForm.events({
  'change .category-filter': function(e) {
    ProductIndex.getComponentMethods()
      .addProps('categoryFilter', $(e.target).val());
  },
  'change .js-volume-from': function(e) {
    ProductIndex.getComponentMethods()
      .addProps('volumeFrom', $(e.target).val());
  },
  'change .js-volume-to': function(e) {
    ProductIndex.getComponentMethods()
      .addProps('volumeTo', $(e.target).val());
  },
  'change .js-price-from': function(e) {
    ProductIndex.getComponentMethods()
      .addProps('priceFrom', $(e.target).val());
  },
  'change .js-price-to': function(e) {
    ProductIndex.getComponentMethods()
      .addProps('priceTo', $(e.target).val());
  }
});
