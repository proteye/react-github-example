import React from 'react';
import { render } from '@testing-library/react';
import LatestRepo from './LatestRepo';

test('renders learn react link', () => {
  const { getByText } = render(<LatestRepo />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
