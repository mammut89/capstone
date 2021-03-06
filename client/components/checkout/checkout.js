Template.checkoutTable.helpers({
  products: function() {
    var cart = Session.get("Cart");
    if(!cart || !Object.keys(cart).length){
      Session.setPersistent("Sum", 0.00);
      return;
    }
    var productIds = _.keys(cart);
    for(var i = 0; i < productIds.length; i++){
      productIds[i] = Number(productIds[i]);
    }

    var tableData = [];
    var productsInCart = Polet.find({
      'ProductNumber': { $in: eval(productIds) }
    }).fetch();

    var sum = 0;
    _.each(productsInCart, function(product) {
      var quantity = cart[product.ProductNumber];
      if(!quantity){
        quantity = 0;
      }
      tableData.push({
        productId: product.ProductNumber,
        productName: product.ProductName,
        price: product.Price,
        volume: product.Volume,
        quantity: quantity
      });
      sum += quantity * product.Price;
    });
    Session.setPersistent("Sum", sum.toFixed(2));
    return tableData;
  },
  sum: function(){
    return Session.get("Sum");
  }
});

Template.checkoutTable.events({
 'change input': function(event) {
   var productId = event.target.id;
   var quantity = event.target.value;
   var cart = Session.get("Cart");
   cart[productId] = quantity;
   Session.setPersistent("Cart", cart);
 }
});

Template.checkoutFinal.events({
 'click .js-pay': function(event) {
   Session.set("Cart", {});
   alert("We will ship your products shortly, thank you for your purchase!");
 },
 'click .js-empty-cart': function(event) {
   event.preventDefault();
   Session.set("Cart", {});
 }
});
