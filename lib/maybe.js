const R = require('ramda');

const MayBe = (val) => {
  const value = val;
  return {
    valueOf() { return value; },
    map(fn) {
      if (R.isNil(value)) {
        return MayBe(null);
      }
      return MayBe(fn(value));
    },
  };
};

module.exports = MayBe;
