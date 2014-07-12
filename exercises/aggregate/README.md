## Data set aggregation

Given an ordered set of data in the following format:

```javascript
[
    { id: 8, playTime:  500, auto: false },
    { id: 7, playTime: 1500, auto: true  },
    { id: 1, playTime:  100, auto: true  },
    { id: 7, playTime: 1000, auto: false },
    { id: 7, playTime: 2000, auto: false },
    { id: 2, playTime: 2000, auto: true  },
    { id: 2, playTime: 2000, auto: true  }
]
```

Write a method named `select`. `select` is used to return items from this set.
It has the interface `select(dataSet [, options])`. The options available should include:

- `id`: get just the items with this id
- `auto`: if `true`, just those with `auto: true`, likewise for `false`.
- `minPlayTime`: get just the items with `playTime` equal to or greater than this number.
- `merge`: if set to `true`...
    - Items with matching ids should be merged into one item. When merging:
        - sum the `playTime` fields
        - if any of the `auto` fields are `false` the result should be `false`
    - This should happen before the other options filter the results.

The order of the results should always remain unchanged from the original set, and in the case
of merging items with duplicate ids, the row should take the place of the latest occurrence of that id.

For example, given the set above...:

```javascript
select(items);
/*
[
    { id: 8, playTime:  500, auto: false },
    { id: 7, playTime: 1500, auto: true  },
    { id: 1, playTime:  100, auto: true  },
    { id: 7, playTime: 1000, auto: false },
    { id: 7, playTime: 2000, auto: false },
    { id: 2, playTime: 2000, auto: true  },
    { id: 2, playTime: 2000, auto: true  }
]
*/

select(items, { merge: true });
/*
[
    { id: 8, playTime:  500, auto: false },
    { id: 1, playTime:  100, auto: true  },
    { id: 7, playTime: 4500, auto: false },
    { id: 2, playTime: 4000, auto: true  }
]
*/

select(items, { id: 2 });
/*
[
    { id: 2, playTime: 2000, auto: true  },
    { id: 2, playTime: 2000, auto: true  }
]
*/

select(items, { minPlayTime: 4000 });
/*
[]
*/

select(items, { merge: true, minPlayTime: 4000 })

/*
[
    { id: 7, playTime: 4500, auto: false },
    { id: 2, playTime: 4000, auto: true  }
]
*/
```

A larger data set is provided in `sample-data.json`.

### Notes

- You may assume an ECMAScript5 environment, including all modern [Array methods][0].
- The solution will be judged on correctness, clarity and efficiency.

[0]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Predefined_Core_Objects?redirectlocale=en-US&redirectslug=JavaScript%2FGuide%2FPredefined_Core_Objects#Array_Methods
