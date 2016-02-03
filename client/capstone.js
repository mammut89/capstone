Router.route('/', function () {
  this.render('main', {
  });
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
