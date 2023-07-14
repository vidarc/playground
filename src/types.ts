import type {
  PipeableStream,
  RenderToPipeableStreamOptions,
} from 'react-dom/server';

export type ServerRenderFunction = (
  url: string,
  options?: RenderToPipeableStreamOptions,
) => PipeableStream;
