import { render, screen } from '@testing-library/react';
import App from './App';

// Los archivos .test son para evaluar cada una de las herramientas
// involucradas dentro del proyecto

// Con estas pruebas se maneja que el tester evalue automáticamente
// cada una de las partes de la interfaz


test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
