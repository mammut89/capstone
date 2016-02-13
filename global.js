Polet = new Meteor.Collection("Polet");

ProductIndex = new EasySearch.Index({
  collection: Polet,
  fields: ['ProductName'],
  engine: new EasySearch.MongoDB({
    selector: function(searchObject, options, aggregation) {
      var selector = this.defaultConfiguration().selector(searchObject, options, aggregation),
        categoryFilter = options.search.props.categoryFilter,
        volumeFilter = {};

      if (options.search.props.volumeFrom) {
        volumeFilter.$gt =  Number(options.search.props.volumeFrom);
      }
      if (options.search.props.volumeTo) {
        volumeFilter.$lt =  Number(options.search.props.volumeTo);
      }
      if (volumeFilter.$gt || volumeFilter.$lt) {
        selector.Volume = volumeFilter;
      }
      if (_.isString(categoryFilter) && !_.isEmpty(categoryFilter)) {
        selector.ProductType = categoryFilter;
      }

      return selector;
    }
  })
});
