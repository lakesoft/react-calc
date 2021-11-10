import { useState } from 'react';
import { CalcState, CalcStateKind, initialCalcState, reduceCalcState } from './calcState';
import { calculate } from './calculator';
import { Display } from './Display';
import { History } from './History';

export const Calc = () => {
  const [displayedValue, setDisplayedValue] = useState<number>(0);
  const [histories, setHistories] = useState<string[]>([]);
  const [calcState, setCalcState] = useState<CalcState>(initialCalcState());

  // e.g.: ["1", "+", "2"]
  const [buffer, setBuffer] = useState<Array<number | string>>([]);

  const numberHandler = (num: number) => {
    const nextCalcState = reduceCalcState(calcState, num);
    setCalcState(nextCalcState);
    switch (calcState) {
      case CalcStateKind.S4:
        setDisplayedValue(num);
        break;
      default:
        setDisplayedValue(calcState === nextCalcState ? displayedValue * 10 + num : num);
    }
  };

  const operatorHandler = (operator: string) => {
    if (operator === 'c') {
      setDisplayedValue(0);
      setBuffer([]);
      setCalcState(initialCalcState());
      return;
    }

    if (operator === '=') {
      if (calcState === CalcStateKind.S3) {
        const [result, text] = calculate([...buffer, displayedValue]);
        setDisplayedValue(result);
        setBuffer([]);
        setHistories([...histories, text]);
      }
      setCalcState(reduceCalcState(calcState, operator));
      return;
    }

    switch (calcState) {
      case CalcStateKind.S1:
        setBuffer([...buffer, displayedValue, operator]);
        break;

      case CalcStateKind.S2:
        // exchange operator
        buffer.pop();
        buffer.push(operator);
        break;

      case CalcStateKind.S3:
        {
          const [result, text] = calculate([...buffer, displayedValue]);
          setDisplayedValue(result);
          setBuffer([result, operator]);
          setHistories([...histories, text]);
        }
        break;

      case CalcStateKind.S4:
        setBuffer([...buffer, displayedValue, operator]);
        break;
    }
    setCalcState(reduceCalcState(calcState, operator));
  };

  return (
    <div>
      <History histories={histories} />
      <Display value={displayedValue} />
      <div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <button onClick={() => numberHandler(num)} key={num}>
            {num}
          </button>
        ))}
      </div>
      <div>
        {['+', '-', '*', '/', '=', 'c'].map((op) => (
          <button onClick={() => operatorHandler(op)} key={op}>
            {op}
          </button>
        ))}
      </div>
    </div>
  );
};
