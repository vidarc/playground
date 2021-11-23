import { StrictMode } from 'react';
// @ts-expect-error this is fine
import { hydrateRoot } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import 'sanitize.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/typography.css';

import { App } from './App';

const root = document.getElementById('root');

hydrateRoot(
  root,
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
