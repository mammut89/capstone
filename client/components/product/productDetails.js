var getStarsEl = function($parent, index) {
  return $parent.find('[data-stars="' + index + '"]');
};
var rtCss = 'current-rating';

Template.productDetails.helpers({
  productName: function() {
    var productId = Number(Iron.Location.get().path.split("/")[2]);
    var product = {};
    Meteor.call('getProductName', productId, function(error, result) {
      Session.setPersistent("Product", result);
      product = result;
      return product.ProductName;
    });
  }
});
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
Template.productDetails.rendered = function() {
  var productId = Number(Iron.Location.get().path.split("/")[2]);
  var rating = Polet.findOne({ProductNumber: productId}).rating;

  var ceil = Math.ceil(rating);
  var floor = Math.floor(rating);
  var percent = rating - floor;

  var elm = $('#rating');
  elm.find('.stars').removeClass(rtCss);

  for (var i = floor; i >= 0; i--) {
    getStarsEl(elm, i).addClass(rtCss);
  }

  elm.trigger('change');
};

Template.productDetails.events({
  'click .js-add-to-cart': function(a, b, c) {
    var productId = Number(Iron.Location.get().path.split("/")[2]);
    var cart = Session.get("Cart");
    if (!cart) {
      cart = {};
    }
    if (cart[productId]) {
      cart[productId] = Number(cart[productId] + 1);
    } else {
      cart[productId] = 1;
    }

    Session.setPersistent("Cart", cart);
    var product = Session.get("Product");
    noty({
      text: 'Added ' + product.ProductName + ' to cart',
      type: 'success',
      timeout: 2000
    });
  },
  'click .js-rate-product': function(event) {
    var productId = Number(Iron.Location.get().path.split("/")[2]);
    var rating = $(event.currentTarget).data("userrating");
    var id = Polet.findOne({
      ProductNumber: productId
    })._id;
    Polet.update({
      _id: id
    }, {
      $set: {
        rating: rating
      }
    }, {
      upsert: true
    });
  }
});
