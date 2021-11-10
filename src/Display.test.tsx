import React from 'react';
import { render, screen } from '@testing-library/react';
import { Display } from './Display';

test('render Display', () => {
  render(<Display value={1234567890} />);
  const element = screen.getByText('1234567890');
  expect(element).toBeInTheDocument();
});
