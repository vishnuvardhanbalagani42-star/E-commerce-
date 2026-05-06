const pick = (object, keys) =>
  keys.reduce((acc, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      acc[key] = object[key];
    }
    return acc;
  }, {});

module.exports = pick;
