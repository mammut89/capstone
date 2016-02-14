Template.category.events({
  'click .js-selectWhiteWineCategory': function() {
    Session.set("Category", 'White wine')
    Router.go("/searchResults");
  },
  'click .js-selectRedWineCategory': function() {
    Session.set("Category", 'Red wine')
    Router.go("/searchResults");
  },
  'click .js-selectRoseWineCategory': function() {
    Session.set("Category", 'Wheat wine')
    Router.go("/searchResults");
  },
  'click .js-selectSparklingWineCategory': function() {
    Session.set("Category", 'Sparkling wine')
    Router.go("/searchResults");
  },
  'click .js-selectWhiskyCategory': function() {
    Session.set("Category", 'Whisky')
    Router.go("/searchResults");
  },
  'click .js-selectCognacCategory': function() {
    Session.set("Category", 'Cognac')
    Router.go("/searchResults");
  },
  'click .js-selectBeerCategory': function() {
    Session.set("Category", 'Beer')
    Router.go("/searchResults");
  },
  'click .js-selectOtherCategory': function() {
    Session.set("Category", 'All')
    Router.go("/searchResults");
  }
});

Template.search.events({
  'submit form': function(event, tmpl) {
    event.preventDefault();
    var searchString = event.target.searchText.value;
    Session.setPersistent('searchString', searchString);
    ProductIndex.getComponentMethods()
      .addProps('categoryFilter', $(event.target).val());
    Router.go("/searchResults");
  }
});

Template.search.helpers({
  productIndex: function() {
    return ProductIndex;
  }
});
