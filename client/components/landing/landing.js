Template.category.events({
  'click .js-selectWhiteWineCategory': function() {
    Session.set("Category", 'White wine');
    Session.set("searchString", "");
    Router.go("/searchResults");
  },
  'click .js-selectRedWineCategory': function() {
    Session.set("Category", 'Red wine');
    Session.set("searchString", "");
    Router.go("/searchResults");
  },
  'click .js-selectWheatWineCategory': function() {
    Session.set("Category", 'Wheat wine');
    Session.set("searchString", "");
    Router.go("/searchResults");
  },
  'click .js-selectSparklingWineCategory': function() {
    Session.set("Category", 'Sparkling wine');
    Session.set("searchString", "");
    Router.go("/searchResults");
  },
  'click .js-selectWhiskyCategory': function() {
    Session.set("Category", 'Whisky');
    Session.set("searchString", "");
    Router.go("/searchResults");
  },
  'click .js-selectBrandyCategory': function() {
    Session.set("Category", 'Brandy');
    Session.set("searchString", "");
    Router.go("/searchResults");
  },
  'click .js-selectBeerCategory': function() {
    Session.set("Category", 'Beer');
    Session.set("searchString", "");
    Router.go("/searchResults");
  },
  'click .js-selectAllCategory': function() {
    Session.set("Category", 'All');
    Session.set("searchString", "");
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
