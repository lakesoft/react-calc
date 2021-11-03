export const CalcStateKind = {
  S0: 's0',
  S1: 's1',
  S2: 's2',
  S3: 's3',
  S4: 's4',
} as const;

export type CalcState = typeof CalcStateKind[keyof typeof CalcStateKind];

export const initialCalcState = () => CalcStateKind.S0;

export const reduceCalcState = (state: CalcState, element: string | number): CalcState => {
  let elementType = 'unkown';
  if (typeof element === 'number') {
    elementType = 'num';
  } else if (typeof element === 'string') {
    if (element === '=') {
      elementType = 'equ';
    } else if (['+', '-', '*', '/'].indexOf(element) >= 0) {
      elementType = 'ope';
    }
  }

  if (elementType === 'unkown') {
    console.log('irregular element: ', element);
    return state;
  }

  switch (state) {
    case CalcStateKind.S0:
      return elementType === 'num' ? CalcStateKind.S1 : state;
    case CalcStateKind.S1:
      return elementType === 'num' ? CalcStateKind.S1 : elementType === 'ope' ? CalcStateKind.S2 : state;
    case CalcStateKind.S2:
      return elementType === 'num' ? CalcStateKind.S3 : state;
    case CalcStateKind.S3:
      return elementType === 'num' ? CalcStateKind.S3 : elementType === 'ope' ? CalcStateKind.S2 : elementType === 'equ' ? CalcStateKind.S4 : state;
    case CalcStateKind.S4:
      return elementType === 'num' ? CalcStateKind.S1 : elementType === 'ope' ? CalcStateKind.S2 : state;
    default:
      console.log('irregular state: ', state);
      return state;
  }
};
