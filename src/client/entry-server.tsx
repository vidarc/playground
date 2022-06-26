import { StrictMode } from 'react';
import {
  renderToPipeableStream,
  type RenderToPipeableStreamOptions,
} from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';

import { App } from './App';

export const render = (url: string, options?: RenderToPipeableStreamOptions) =>
  renderToPipeableStream(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
    options
  );
