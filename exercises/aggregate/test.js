var should = require('should'),
    select = require('./select');

var sampleData = [
  { id: 8, playTime:  500, auto: false },
  { id: 7, playTime: 1500, auto: true  },
  { id: 1, playTime:  100, auto: true  },
  { id: 7, playTime: 1000, auto: false },
  { id: 7, playTime: 2000, auto: false },
  { id: 2, playTime: 2000, auto: true  },
  { id: 2, playTime: 2000, auto: true  }
];

describe('Select', function(){
  describe('sanity checks', function() {
    it('should be a function', function() {
      select.should.be.a.Function;
    });

    it('should throw if it is given a non-array-like data set', function() {
      select.bind(null, 42).should.throw();
    });

    it('should return an empty array when given an empty array', function() {
      select([]).should.eql([]);
    });

    it('should return a new reference to the same array when no options are provided', function() {
      select(sampleData).should.eql(sampleData);
      select(sampleData).should.not.be.exactly(sampleData);
    });

    it('should not modify the original array', function() {
      var length = sampleData.length;

      select(sampleData, { merge: true, auto: false });

      sampleData.length.should.be.exactly(length);
      sampleData.should.be.exactly(sampleData);
    });
  });

  describe('passes provided examples', function() {
    it('passes example 1', function() {
      select(sampleData, { merge: true }).should.eql([
        { id: 8, playTime:  500, auto: false },
        { id: 1, playTime:  100, auto: true  },
        { id: 7, playTime: 4500, auto: false },
        { id: 2, playTime: 4000, auto: true  }
      ]);
    });

    it('passes example 2', function() {
      select(sampleData, { id: 2 }).should.eql([
          { id: 2, playTime: 2000, auto: true  },
          { id: 2, playTime: 2000, auto: true  }
      ])
    });

    it('passes example 3', function() {
      select(sampleData, { minPlayTime: 4000 }).should.eql([]);
    });

    it('passes example 4', function() {
      select(sampleData, { merge: true, minPlayTime: 4000 }).should.eql([
          { id: 7, playTime: 4500, auto: false },
          { id: 2, playTime: 4000, auto: true  }
      ]);
    });
  });
});
