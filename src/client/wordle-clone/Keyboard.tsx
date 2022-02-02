/** @jsxImportSource @compiled/react */

const rowOne = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'] as const;
const rowTow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'] as const;
const rowThree = ['z', 'x', 'c', 'v', 'b', 'n', 'm'] as const;

type KeyType =
  | typeof rowOne[number]
  | typeof rowTow[number]
  | typeof rowThree[number]
  | 'enter'
  | 'backspace';

const isSpecialKey = (key: KeyType): key is 'enter' | 'backspace' =>
  key === 'enter' || key === 'backspace';

const Key: React.FunctionComponent<{ type: KeyType }> = ({ type }) => (
  <div
    css={{
      backgroundColor: 'lightgray',
      border: '2px solid black',
      borderRadius: '5px',
      color: 'white',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.75rem',
      width: isSpecialKey(type) ? '70px' : '35px',
      height: '50px',
      textShadow: '0 0 2px black',
      userSelect: 'none',
      margin: '2px',
    }}
  >
    {type.toLocaleUpperCase()}
  </div>
);

export const Keyboard = () => {
  return (
    <div>
      <div>
        {rowOne.map((key) => (
          <Key key={key} type={key} />
        ))}
      </div>
      <div>
        {rowTow.map((key) => (
          <Key key={key} type={key} />
        ))}
      </div>
      <div>
        <Key type={'enter'} />
        {rowThree.map((key) => (
          <Key key={key} type={key} />
        ))}
        <Key type={'backspace'} />
      </div>
    </div>
  );
};
