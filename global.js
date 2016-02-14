Polet = new Meteor.Collection("Polet");

ProductIndex = new EasySearch.Index({
  collection: Polet,
  fields: ['ProductName'],
  engine: new EasySearch.MongoDB({
    selector: function(searchObject, options, aggregation) {
      var selector = this.defaultConfiguration().selector(searchObject, options, aggregation),
        categoryFilter = options.search.props.categoryFilter,
        volumeFilter = {},
        priceFilter = {};

      if (options.search.props.volumeFrom) {
        volumeFilter.$gt =  Number(options.search.props.volumeFrom);
      }
      if (options.search.props.volumeTo) {
        volumeFilter.$lt =  Number(options.search.props.volumeTo);
      }
      if (volumeFilter.$gt || volumeFilter.$lt) {
        selector.Volume = volumeFilter;
      }

      if (options.search.props.priceFrom) {
        priceFilter.$gt =  Number(options.search.props.priceFrom);
      }
      if (options.search.props.priceTo) {
        priceFilter.$lt =  Number(options.search.props.priceTo);
      }
      if (priceFilter.$gt || priceFilter.$lt) {
        selector.Price = priceFilter;
      }

      if (_.isString(categoryFilter) && !_.isEmpty(categoryFilter)) {
        selector.ProductType = categoryFilter;
      }

      return selector;
    }
  })
});
