/** @jsxImportSource @compiled/react */

import { CSSProps } from '@compiled/react';
import { useContext } from 'react';

import { StateDispatch } from './Wordle';

const rowOne = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'] as const;
const rowTow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'] as const;
const rowThree = ['z', 'x', 'c', 'v', 'b', 'n', 'm'] as const;

type KeyType =
  | typeof rowOne[number]
  | typeof rowTow[number]
  | typeof rowThree[number]
  | 'enter'
  | 'backspace';

const isValidKey = (key: unknown): key is KeyType =>
  typeof key === 'string' &&
  (rowOne.some((value) => value === key) ||
    rowTow.some((value) => value === key) ||
    rowThree.some((value) => value === key));

const isSpecialKey = (key: KeyType): key is 'enter' | 'backspace' =>
  key === 'enter' || key === 'backspace';

const Key: React.FunctionComponent<{ type: KeyType }> = ({ type }) => (
  <div
    css={{
      alignItems: 'center',
      backgroundColor: 'lightgray',
      border: '2px solid black',
      borderRadius: '5px',
      color: 'white',
      display: 'inline-flex',
      fontSize: isSpecialKey(type) ? '1rem' : '1.5rem',
      height: '50px',
      justifyContent: 'center',
      margin: '2px',
      textShadow: '0 0 2px black',
      userSelect: 'none',
      width: isSpecialKey(type) ? '70px' : '35px',
    }}
  >
    {type}
  </div>
);

const row: CSSProps = { display: 'flex', justifyContent: 'center' };

export const Keyboard = () => {
  const dispatch = useContext(StateDispatch);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      event.target instanceof HTMLDivElement &&
      isValidKey(event.target.textContent)
    ) {
      dispatch({ type: 'enter-letter', letter: event.target.textContent });
    }

    if (
      event.target instanceof HTMLDivElement &&
      event.target.textContent === 'enter'
    ) {
      dispatch({ type: 'set-guess' });
    }
  };

  return (
    <div onClick={handleClick}>
      <div css={row}>
        {rowOne.map((key) => (
          <Key key={key} type={key} />
        ))}
      </div>
      <div css={row}>
        {rowTow.map((key) => (
          <Key key={key} type={key} />
        ))}
      </div>
      <div css={row}>
        <Key type={'enter'} />
        {rowThree.map((key) => (
          <Key key={key} type={key} />
        ))}
        <Key type={'backspace'} />
      </div>
    </div>
  );
};
