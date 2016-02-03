Router.configure({
  layoutTemplate: 'main'
});
Router.route('/', function () {
  this.render('landingComponent', {to: 'body'});
});
Router.route('/shop', function () {
  this.render('shopComponent', {to: 'body'});
});
Router.route('/checkout', function () {
  this.render('checkoutComponent', {to: 'body'});
});
Router.route('/help', function () {
  this.render('helpComponent', {to: 'body'});
});

Template.category.events({
    'click .js-selectWhiteWineCategory': function(){
    },
    'click .js-selectRedWineCategory': function(){
    },
    'click .js-selectRoseWineCategory': function(){
    },
    'click .js-selectSparklingWineCategory': function(){
    },
    'click .js-selectWhiskyCategory': function(){
    },
    'click .js-selectCognacCategory': function(){
    },
    'click .js-selectBeerCategory': function(){
    },
    'click .js-selectOtherCategory': function(){
    },
});
