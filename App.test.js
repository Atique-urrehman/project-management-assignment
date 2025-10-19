import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app title', () => {
  render(<App />);
  const title = screen.getByText(/PM Standards Comparison/i);
  expect(title).toBeInTheDocument();
});
