// eslint-disable-next-line testing-library/no-manual-cleanup
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import store from '../../store';
import { setToken } from '../../store/slice/tokenSlice';
import { ROUTES } from '../../helpers/routes';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../../components/route/ProtectedRoute/ProtectedRoute';
import { Provider } from 'react-redux';
import { Logout } from '../../pages/Logout/Logout';
import userEvent from '@testing-library/user-event';

describe('Logout Page', () => {
  afterEach(() => {
    cleanup();
  });

  it('should clear token if logout is clicked', async () => {
    store.dispatch(setToken('some-token'));

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ROUTES.LOGOUT]}>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path={ROUTES.SERVER_LIST} element={<div>Server List</div>} />
              <Route path={ROUTES.LOGOUT} element={<Logout redirectPath={ROUTES.SERVER_LIST} />} />
            </Route>
            <Route path={ROUTES.LOGIN} element={<div>Login</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const logoutButton = screen.getByRole('button');
    await userEvent.click(logoutButton);

    const serverList = screen.queryByText('Server List');
    expect(serverList).not.toBeTruthy();

    const login = screen.getByText('Login');
    expect(login).toBeTruthy();
  });
});
