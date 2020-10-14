import React from 'react';
import { render } from '@testing-library/react';
import Map from './Map';

test('renders learn react link', () => {
  const { getByText } = render(<Map />);
  const linkElement = getByText('Pizza Map');
  expect(linkElement).toBeInTheDocument();
});