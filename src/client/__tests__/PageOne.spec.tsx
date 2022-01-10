import { render, screen, waitFor } from '@testing-library/react';

import PageOne from '../PageOne';

test('it renders', async () => {
  render(<PageOne />);

  const header = await screen.findByText(/This is page one/i);
  expect(header).toBeDefined();

  await waitFor(() => {
    const data = screen.getByText(/Santa Claus/i);
    expect(data).toBeInTheDocument();
  });
});
