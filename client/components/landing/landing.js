Template.category.events({
  'click .js-selectWhiteWineCategory': function() {
    Router.go("/search");
  },
  'click .js-selectRedWineCategory': function() {
    Router.go("/search");
  },
  'click .js-selectRoseWineCategory': function() {
    Router.go("/search");
  },
  'click .js-selectSparklingWineCategory': function() {
    Router.go("/search");
  },
  'click .js-selectWhiskyCategory': function() {
    Router.go("/search");
  },
  'click .js-selectCognacCategory': function() {
    Router.go("/search");
  },
  'click .js-selectBeerCategory': function() {
    Router.go("/search");
  },
  'click .js-selectOtherCategory': function() {
    Router.go("/search");
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
