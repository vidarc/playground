import { useState } from 'react';

export const App: React.FunctionComponent = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <>
      <div>Hello. This will be something at some point.</div>
      <div>{count}</div>
      <button onClick={handleClick}>Click Me!</button>
    </>
  );
};
