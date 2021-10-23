import { useState } from 'react';
import { styled } from '@compiled/react';

const Container = styled.div`
  display: flex;
`;

export const ReactCounter: React.FunctionComponent = () => {
  const [count, setCount] = useState(0);
  const add = () => setCount((i) => i + 1);
  const subtract = () => setCount((i) => i - 1);

  return (
    <Container id="react">
      <button onClick={subtract}>-</button>
      <pre>{count}</pre>
      <button onClick={add}>+</button>
    </Container>
  );
};
