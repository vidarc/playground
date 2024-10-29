import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { AppWithSharedProviders } from './AppWithSharedProviders';

import 'sanitize.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/typography.css';

const root = document.getElementById('root')!;

hydrateRoot(
  root,
  <StrictMode>
    <BrowserRouter>
      <AppWithSharedProviders />
    </BrowserRouter>
  </StrictMode>,
);
