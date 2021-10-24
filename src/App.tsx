import { useState } from 'react';
import { styled } from '@compiled/react';

const Container = styled.div`
  margin: 0 auto;
`;

export const App: React.FunctionComponent = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <>
      <Container>
        <div>Hello. This will be something at some point.</div>
        <div>{count}</div>
        <button onClick={handleClick}>Click Me!</button>
      </Container>
    </>
  );
};
