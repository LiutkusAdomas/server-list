import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { ServerResponse } from '../../model/ServerResponse.type';
// eslint-disable-next-line testing-library/no-manual-cleanup
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { ServerList } from '../../pages/ServerList/ServerList';
import { Provider } from 'react-redux';
import store from '../../store';
import userEvent from '@testing-library/user-event';
import { playgroundApi } from '../../api/playgroundApiService';
import { setToken } from '../../store/slice/tokenSlice';

const initialData: ServerResponse[] = [
  { name: 'Latvia', distance: 3 },
  { name: 'Japan', distance: 1 },
  { name: 'Lithuania', distance: 2 },
  { name: 'Singapore', distance: 6 },
  { name: 'Germany', distance: 5 },
  { name: 'United Kingdom', distance: 4 },
  { name: 'United States', distance: 7 },
  { name: 'Poland', distance: 7 },
];

describe('Server List page', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.mockOnce(JSON.stringify(initialData));
  });

  afterEach(() => {
    store.dispatch(playgroundApi.util.resetApiState());
    cleanup();
  });

  it('should check the general rendering of the list and the token headers', async () => {
    store.dispatch(setToken('some-token'));
    render(
      <Provider store={store}>
        <ServerList />
      </Provider>
    );
    const loading = screen.getByText('Loading...');
    expect(loading).toBeTruthy();

    await waitFor(() => {
      const tableRows = screen.getAllByRole('row');

      tableRows.forEach((row) => {
        if (row.innerText.includes('Poland')) expect(row.innerHTML).not.toContain('svg');
        else expect(row.innerHTML).toContain('svg');
      });
    });

    const requests = fetchMock.requests();
    expect(requests.length).toBe(1);
    expect(requests[0].headers.get('Authorization')).toBe('Bearer some-token');
  });

  it('should check the ordering of the list', async () => {
    render(
      <Provider store={store}>
        <ServerList />
      </Provider>
    );

    await waitFor(async () => {
      const nameHeader = screen.getByText('Name');
      await userEvent.click(nameHeader);

      const tableRows = screen.getAllByRole('row');
      expect(tableRows[1].textContent).toContain('United States'); // the first row is the header
    });
  });

  it('should check the error handling', async () => {
    fetchMock.resetMocks();
    fetchMock.mockOnce(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      statusText: 'Unauthorized',
    });

    render(
      <Provider store={store}>
        <ServerList />
      </Provider>
    );

    await waitFor(() => {
      const errorMessage = screen.getByText('Something went wrong...:(');
      expect(errorMessage).toBeTruthy();
    });
  });
});
