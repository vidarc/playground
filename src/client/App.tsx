import { styled } from '@compiled/react';

import dcunited from './assets/dcunited.svg';
import kickers from './assets/kickers.svg';
import tottenham from './assets/tottenham.svg';

const Container = styled.main`
  margin: 0 auto;
  text-align: center;
`;

const Logo = styled.img`
  height: 100px;
`;

export const App = () => (
  <Container>
    <p>Hello. I am Matthew Ailes. This will be something at some point.</p>
    <Logo src={tottenham} alt="Tottenham Hotspur" />
    <Logo src={dcunited} alt="DC United" />
    <Logo src={kickers} alt="Richmond Kickers" />
  </Container>
);
