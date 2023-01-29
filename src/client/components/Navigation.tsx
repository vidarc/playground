import { css } from '@linaria/atomic';
import { cx } from '@linaria/core';
import { NavLink } from 'react-router-dom';

const style = css`
  border-bottom: solid 1px;
  padding-bottom: 1rem;
`;

const marginRight = css`
  margin-right: 1rem;
`;

export const Navigation = () => (
  <nav className={cx(style)}>
    <NavLink to="/" className={cx(marginRight)}>
      Home
    </NavLink>
    <NavLink to="/one" className={cx(marginRight)}>
      Page One
    </NavLink>
    <NavLink to="/two">Page Two</NavLink>
  </nav>
);
