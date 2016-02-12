Polet = new Meteor.Collection("Polet");

ProductIndex = new EasySearch.Index({
  collection: Polet,
  fields: ['ProductName'],
  engine: new EasySearch.MongoDB({
    selector: function(searchObject, options, aggregation) {
      var selector = this.defaultConfiguration().selector(searchObject, options, aggregation),
        categoryFilter = options.search.props.categoryFilter;
      if (_.isString(categoryFilter) && !_.isEmpty(categoryFilter)) {
        selector.category = categoryFilter;
      }
      return selector;
    }
  })
});
