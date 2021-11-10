// translate Infix Notation to Reverse Polish Notation
const makeQueue = (buffer: Array<number | string>): Array<number | string> => {
  const queue = new Array<number | string>();
  let op: string | null = null;

  buffer.forEach((elm) => {
    typeof elm === 'number' || op ? queue.push(elm) : (op = elm);
  });
  if (op) queue.push(op);

  return queue;
};

export const calculate = (buffer: Array<number | string>): [number, string] => {
  const stack: Array<number> = [];

  makeQueue(buffer).forEach((element) => {
    if (typeof element === 'number') {
      stack.push(element);
    } else {
      const v1 = stack.pop() ?? 0;
      const v2 = stack.pop() ?? 0;
      switch (element) {
        case '+':
          stack.push(v2 + v1);
          break;
        case '-':
          stack.push(v2 - v1);
          break;
        case '*':
          stack.push(v2 * v1);
          break;
        case '/':
          stack.push(v2 / v1);
          break;
        default:
          console.log('irregular operator', element);
          break;
      }
    }
  });

  const result = stack.pop() ?? 0;
  return [result, buffer.join(' ') + ' = ' + result];
};
