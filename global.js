Polet = new Meteor.Collection("Polet");

ProductIndex = new EasySearch.Index({
  collection: Polet,
  fields: ['ProductName'],
  defaultSearchOptions: {
    limit: 8
  },
  engine: new EasySearch.MongoDB({
    selector: function(searchObject, options, aggregation) {
      var selector = this.defaultConfiguration().selector(searchObject, options, aggregation),
        categoryFilter = options.search.props.categoryFilter,
        scoreFilter = {};


        console.log(options.search.props.minScore);
      if (options.search.props.minScore) {
        scoreFilter.$gt =  options.search.props.minScore;
      }

      if (scoreFilter.$gt) {
        console.log(scoreFilter);
        selector.Volume = scoreFilter;

      }
      if (_.isString(categoryFilter) && !_.isEmpty(categoryFilter)) {
        selector.ProductType = categoryFilter;
      }
      console.log(selector);

      return selector;
    }
  })
});
