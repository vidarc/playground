import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { lazy, Suspense } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';

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

const marginRight = css`
  margin-right: 1rem;
`;

const LazyPageOne = lazy(() => import('./PageOne'));
const LazyPageTwo = lazy(() => import('./PageTwo'));

const LazyWrapper: React.FunctionComponent<React.PropsWithChildren> = ({
  children,
}) => <Suspense fallback={<div>loading</div>}>{children}</Suspense>;

export const App = () => (
  <Container>
    <Nav>
      <NavLink to="/" className={marginRight}>
        Home
      </NavLink>
      <NavLink to="/one" className={marginRight}>
        Page One
      </NavLink>
      <NavLink to="/two">Page Two</NavLink>
    </Nav>
    <p>Hello. I am Matthew Ailes. This will be something at some point.</p>
    <Logo src={tottenham} alt="Tottenham Hotspur" />
    <Logo src={dcunited} alt="DC United" />
    <Logo src={kickers} alt="Richmond Kickers" />
    <Routes>
      <Route path="/one" element={<LazyWrapper children={<LazyPageOne />} />} />
      <Route path="two" element={<LazyWrapper children={<LazyPageTwo />} />} />
    </Routes>
  </Container>
);
