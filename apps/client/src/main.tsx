import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { AppRoutes } from './routes';
import './styles.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>
);
