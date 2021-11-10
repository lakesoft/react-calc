import { calculate } from './calculator';

test('basic case', () => {
  expect(calculate([11, '+', 99])).toStrictEqual([110, '11 + 99 = 110']);
  expect(calculate([100, '-', 99])).toStrictEqual([1, '100 - 99 = 1']);
  expect(calculate([11, '*', 22])).toStrictEqual([242, '11 * 22 = 242']);
  expect(calculate([125, '/', 25])).toStrictEqual([5, '125 / 25 = 5']);
});

test('irregular case', () => {
  expect(calculate([])).toStrictEqual([0, ' = 0']);
  expect(calculate([1])).toStrictEqual([1, '1 = 1']);
  expect(calculate([1, '+'])).toStrictEqual([1, '1 + = 1']);
  expect(calculate([1, '$'])).toStrictEqual([0, '1 $ = 0']);
  expect(calculate(['a', 'b', 'c'])).toStrictEqual([0, 'a b c = 0']);
});
