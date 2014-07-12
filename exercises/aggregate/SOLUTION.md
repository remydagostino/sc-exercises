## The problem

This problem is very simple, clearly the challenge is in creating a solution that can be easily maintained.

I think it's clear that this is a specific case of an array reduce to merge the data set, and then an array filter to exclude the unwanted items.

Perhaps the tricky bit here is the multiple dispatch required to apply the different filters to the data set. This could be implemented using a switch statement but I worry that doing so would hide code that is potentially useful elsewhere inside the body of another function.

## Tests

To run my small test suite install mocha using NPM.

`sudo npm install -g mocha`

To run the tests:

`mocha test.js`


## A note about performance

I have intentionally disregarded any concerns about performance in favourof writing code that I think is easier to reason about and reuse.

I strongly believe that the root of all evil in software development is premature optimization. If performance became a concern I would use tools to determine which functions were hogging memory or cpu cycles (almost definitely `filterData`) and then optimise those functions.

Note that while some of the functions I've written may be slow, all of them are referentially transparent and could easilly be modified to cache their results.


## Code smell

If a manager had given me this assignment with the intention to use my solution in production code I would have raised an eyebrow and then explained my concerns.

- Why should `options` be an optional argument? It seems like this function doesn't do anything useful unless it is provided. I think it would be more appropriate to throw if the function is called with only a single argument.
- Why are we packing so much functionality into a single function? Many of the things this function does would surely be useful on their own. I think that this functionality sould be exposed as a module with the following methods.
  - `filterById(id, dataSet)`
  - `filterByAuto(auto, dataSet)`
  - `filterByMinPlayTime(playTime, dataSet)`
  - `merge(dataSet)`
  - `filterBy(options, dataSet)`
  - `select(options, dataSet)`
- Why are the order of arguments `dataSet` then `options`. If the order of arguments were reversed then this function could be partially applied and used as a building block for other functions.
