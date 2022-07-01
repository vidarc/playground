import { StrictMode } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';

import type { ServerRenderFunction } from '../types';

import { App } from './App';

export const render: ServerRenderFunction = (url, options) =>
  renderToPipeableStream(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
    options
  );
