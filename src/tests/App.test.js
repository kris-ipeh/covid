import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from '../app/App';

test('render title', () => {
  const { getByText } = render(<App />);
  const title = getByText(/COVID-19: Attestation de Sortie/gi);
  expect(title).toBeInTheDocument();
});
