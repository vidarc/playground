import { render, screen } from '@testing-library/react';
import { test } from 'vitest';

import PageTwo from '../PageTwo';

test('it renders', () => {
  render(<PageTwo />);

  screen.getByText('This is page two');
});
