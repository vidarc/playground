import { useState } from 'react';

export const App: React.FunctionComponent = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <>
      <div>Hello World! {count}</div>
      <button onClick={handleClick}>Click Me!</button>
    </>
  );
};
