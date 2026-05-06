const pick = require('../utils/pick');

describe('pick util', () => {
  it('should select only allowed keys', () => {
    const source = { a: 1, b: 2, c: 3 };
    expect(pick(source, ['a', 'c'])).toEqual({ a: 1, c: 3 });
  });

  it('should ignore missing keys', () => {
    const source = { a: 1 };
    expect(pick(source, ['a', 'b'])).toEqual({ a: 1 });
  });
});
