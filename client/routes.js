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
Router.route('/search', function () {
  this.render('searchComponent', {to: 'body'});
});
Router.route('/searchResults', function () {
  this.render('searchResultsComponent', {to: 'body'});
});
