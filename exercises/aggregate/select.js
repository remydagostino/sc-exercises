(function(root) {
  "use strict";

  var select,
      filterData,
      accumulateData,
      firstIndexOfId,
      filters,
      filterDataSet,
      mergeDataSet;

  // Accepts an array of objects and a query object
  // Performs a fold and filter on the data set
  // Throws if the provided dataSet can not be filtered or reduced
  // :: array -> array
  // :: array -> object -> array
  select = function(dataSet, options) {
    options = options || {};

    if (!dataSet.filter || !dataSet.reduce) {
      throw new Error('`dataSet` must expose `filter` and `reduce`');
    }

    return filterDataSet(options, mergeDataSet(options.merge, dataSet));
  };

  // :: object -> array -> array
  filterDataSet = function(options, dataSet) {
    return dataSet.filter(filterData.bind(this, options));
  };

  // :: boolean -> array -> array
  mergeDataSet = function(mergeValue, dataSet) {
    return dataSet.reduce(accumulateData.bind(this, mergeValue), []);
  };

  // Appends a new item to a data set.
  // If mergeValue is true and there is an object with the same `id`
  // as the item in the dataSet then it will be removed from the list
  // and merged into the item.
  // :: boolean -> array -> object -> array
  accumulateData = function(mergeValue, dataSet, data) {
    var firstIndex, duplicate;

    if (mergeValue === true) {
      firstIndex = firstIndexOfId(dataSet, data.id);

      if (firstIndex !== -1) {
        duplicate = dataSet[firstIndex];

        // Remove the duplicate from the list
        dataSet = dataSet.filter(function(value, index) {
          return index != firstIndex;
        });

        // Merge the two items
        data = {
          id       : data.id,
          playTime : data.playTime + duplicate.playTime,
          auto     : data.auto && duplicate.auto
        };
      }
    }

    return dataSet.concat([data]);
  };

  // Returns the first index of an object in a dataset which maches the
  // provided key `id`
  // :: array -> a -> int
  firstIndexOfId = function(dataSet, id) {
    return dataSet.reduce(function(memo, value, index) {
      if (memo !== -1) {
        return memo;
      }

      return filters.id(id, value) ? index : -1;
    }, -1);
  };

  // Determines if an object matches the requirements
  // of a set of filters. Uses multiple dispatch to
  // determine which filters to use from the 'filters'
  // dictionary
  // :: object -> object -> boolean
  filterData = function(options, data) {
    var filter = Object.keys(filters).reduce(function(memo, key) {
      if (!options.hasOwnProperty(key)) {
        return memo;
      }

      return function(value) {
        return memo(value) && filters[key](options[key], value);
      };
    }, function() { return true; });

    return filter(data);
  };

  filters = {
    // :: a -> object -> boolean
    id: function(id, data) {
      return data.id === id;
    },

    // :: boolean -> object -> boolean
    auto: function(isAuto, data) {
      return data.auto === isAuto;
    },

    // :: int -> object -> boolean
    minPlayTime: function(minTime, data) {
      return data.playTime >= minTime;
    }
  };

  // Expose the select function
  // ... either as a common js module
  if (module && module.exports) {
    module.exports = select;
  }
  // ... or a global
  else {
    root.select = select;
  }
})(this);
