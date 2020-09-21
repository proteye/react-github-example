import React from 'react';
import {render, waitForElement} from '@testing-library/react';
import App from './App';

test('renders header', async () => {
  const { getByText } = render(<App/>);
  const element = await waitForElement(() => getByText(/React Github Example/i));
  expect(element).toBeInTheDocument();
});

test('renders footer', async () => {
  const { getByText } = render(<App/>);
  const element = await waitForElement(() => getByText(/Copyright © 2020 | @proteye/i));
  expect(element).toBeInTheDocument();
});
