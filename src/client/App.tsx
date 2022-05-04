/** @jsxImportSource @compiled/react */

import { styled } from '@compiled/react';
import loadable from '@loadable/component';
import React, { Suspense } from 'react';
import { NavLink, Route, Routes, useResolvedPath } from 'react-router-dom';

import dcunited from './assets/dcunited.svg';
import kickers from './assets/kickers.svg';
import tottenham from './assets/tottenham.svg';

const Container = styled.main`
  margin: 0 auto;
  text-align: center;
`;

const Nav = styled.nav`
  border-bottom: solid 1px;
  padding-bottom: 1rem;
`;

const Logo = styled.img`
  height: 5rem;
`;

const LazyPageOne = loadable(() => import('./PageOne'));
const LazyPageTwo = loadable(() => import('./PageTwo'));
const LazyGameEntry = loadable(() => import('./Game/Entry'), { ssr: false });

const LazyWrapper: React.FunctionComponent<
  React.PropsWithChildren<Record<string, unknown>>
> = ({ children }) => (
  <Suspense fallback={<div>loading</div>}>{children}</Suspense>
);

export const App = () => {
  const { pathname } = useResolvedPath({});

  return (
    <Container>
      <Nav>
        <NavLink to="/" css={{ marginRight: '1rem' }}>
          Home
        </NavLink>
        <NavLink to="/one" css={{ marginRight: '1rem' }}>
          Page One
        </NavLink>
        <NavLink to="/two" css={{ marginRight: '1rem' }}>
          Page Two
        </NavLink>
        <NavLink to="/game">The Game</NavLink>
      </Nav>
      {pathname === '/game' || (
        <>
          <p>
            Hello. I am Matthew Ailes. This will be something at some point.
          </p>
          <Logo src={tottenham} alt="Tottenham Hotspur" />
          <Logo src={dcunited} alt="DC United" />
          <Logo src={kickers} alt="Richmond Kickers" />
        </>
      )}
      <Routes>
        <Route
          path="one"
          element={<LazyWrapper children={<LazyPageOne />} />}
        />
        <Route
          path="two"
          element={<LazyWrapper children={<LazyPageTwo />} />}
        />
        <Route
          path="game"
          element={<LazyWrapper children={<LazyGameEntry />} />}
        />
      </Routes>
    </Container>
  );
};
