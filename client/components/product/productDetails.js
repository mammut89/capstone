var getStarsEl = function($parent, index) {
  return $parent.find('[data-stars="' + index + '"]');
};
var rtCss = 'current-rating';

Template.productDetails.helpers({
  productName: function() {
    var productId = Number(Iron.Location.get().path.split("/")[2]);
    var product = {};
    Meteor.call('getProduct', productId, function(error, result) {
      Session.setPersistent("Product", result);
      product = result || {};
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
      if (!(key === '_id' || key === 'Rating')) {
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

  Meteor.call('getProduct', productId, function(error, result) {
    var ratings = result.Rating || {};
    var ratingAverage = 0;
    var ratingTotal = 0;
    var ratingCounter = 0;

    _.each(ratings, function(rating) {
      ratingCounter = ratingCounter + Number(1);
      ratingTotal = ratingTotal + rating;
    });
    ratingAverage = ratingTotal / ratingCounter;

    var floor = Math.floor(ratingAverage);
    var elm = $('#rating');
    elm.find('.stars').removeClass(rtCss);

    for (var i = floor; i >= 0; i--) {
      getStarsEl(elm, i).addClass(rtCss);
    }

    elm.trigger('change');
  });
};

Template.productDetails.events({
  'click .js-add-to-cart': function() {
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
    var product;
    Meteor.call('getProduct', productId, function(error, result) {
      product = result;
      noty({
        text: 'Added ' + product.ProductName + ' to cart',
        type: 'success',
        timeout: 2000
      });
    });
  },
  'click .js-rate-product': function(event) {
    if (!Meteor.userId()) {
      alert("You must be logged in for your vote to be stored!");
      return;
    }
    var productId = Number(Iron.Location.get().path.split("/")[2]);
    var chosenRating = $(event.currentTarget).data("userrating");
    var product = Polet.findOne({
      ProductNumber: productId
    });
    var rating = product.Rating || {};
    var userId = Meteor.userId();
    rating[userId] = chosenRating;

    Polet.update({
      _id: product._id
    }, {
      $set: {
        Rating: rating
      }
    }, {
      upsert: true
    });
  }
});
