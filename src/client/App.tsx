import { css } from '@linaria/atomic';
import { cx } from '@linaria/core';

import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import dcunited from './assets/dcunited.svg';
import kickers from './assets/kickers.svg';
import tottenham from './assets/tottenham.svg';
import { Navigation } from './components/Navigation';

const container = css`
  margin: 0 auto;
  text-align: center;
`;

const logo = css`
  height: 5rem;
`;

const LazyPageOne = lazy(() => import('./features/page-one/PageOne'));
const LazyPageTwo = lazy(() => import('./features/page-two/PageTwo'));

const LazyWrapper: React.FunctionComponent<React.PropsWithChildren> = ({
  children,
}) => <Suspense fallback={<div>loading</div>}>{children}</Suspense>;

export const App = () => (
  <div className={cx(container)}>
    <Navigation />
    <p>Hello. I am Matthew Ailes. This will be something at some point.</p>
    <img src={tottenham} alt="Tottenham Hotspur" className={cx(logo)} />
    <img src={dcunited} alt="DC United" className={cx(logo)} />
    <img src={kickers} alt="Richmond Kickers" className={cx(logo)} />
    <Routes>
      <Route path="/one" element={<LazyWrapper children={<LazyPageOne />} />} />
      <Route path="two" element={<LazyWrapper children={<LazyPageTwo />} />} />
    </Routes>
  </div>
);
