import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { AppRoutes } from './routes';
import './styles.scss';
import { AppProviders } from './providers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  </StrictMode>
);
