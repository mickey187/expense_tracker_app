import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import store from './store/store';
import { Provider as ReduxProvider } from 'react-redux'; // Redux Provider
import { Provider as TooltipProvider } from '@radix-ui/react-tooltip'; // Tooltip Provider

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}> {/* Redux store provider */}
      <TooltipProvider> {/* Tooltip context provider */}
        <App />
      </TooltipProvider>
    </ReduxProvider>
  </StrictMode>
);
