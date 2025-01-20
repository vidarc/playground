import { StrictMode } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router';

import type { ServerRenderFunction } from '../types';

import { AppWithSharedProviders } from './AppWithSharedProviders';

export const render: ServerRenderFunction = (url, options) =>
  renderToPipeableStream(
    <StrictMode>
      <StaticRouter location={url}>
        <AppWithSharedProviders />
      </StaticRouter>
    </StrictMode>,
    options,
  );
