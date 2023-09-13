// eslint-disable-next-line testing-library/no-manual-cleanup
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import store from '../../../store';
import { clearToken, setToken } from '../../../store/slice/tokenSlice';
import { ROUTES } from '../../../helpers/routes';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../../../components/route/ProtectedRoute/ProtectedRoute';
import { Provider } from 'react-redux';

describe('Protected Route Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should redirect if token is not provided', () => {
    store.dispatch(clearToken());

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ROUTES.SERVER_LIST]}>
          <Routes>
            <Route element={<ProtectedRoute redirectPath={ROUTES.LOGIN} />}>
              <Route path={ROUTES.SERVER_LIST} element={<div>Server List</div>} />
            </Route>
            <Route path={ROUTES.LOGIN} element={<div>Login</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const loginText = screen.getByText('Login');
    expect(loginText).toBeTruthy();
  });

  it('should go through to Server List if token is provided', () => {
    store.dispatch(setToken('some-token'));

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ROUTES.SERVER_LIST]}>
          <Routes>
            <Route element={<ProtectedRoute redirectPath={ROUTES.LOGIN} />}>
              <Route path={ROUTES.SERVER_LIST} element={<div>Server List</div>} />
            </Route>
            <Route path={ROUTES.LOGIN} element={<div>Login</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const loginText = screen.getByText('Server List');
    expect(loginText).toBeTruthy();
  });

  it('should redirect to Login by default if Token is not provided', () => {
    store.dispatch(clearToken());

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ROUTES.SERVER_LIST]}>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path={ROUTES.SERVER_LIST} element={<div>Server List</div>} />
            </Route>
            <Route path={ROUTES.LOGIN} element={<div>Login</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const loginText = screen.getByText('Login');
    expect(loginText).toBeTruthy();
  });
});
