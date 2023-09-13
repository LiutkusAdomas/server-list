// eslint-disable-next-line testing-library/no-manual-cleanup
import { render, screen, cleanup } from '@testing-library/react';
import { describe, expect, it, afterEach } from 'vitest';
import { Login } from '../../pages/Login/Login';
import { Provider } from 'react-redux';
import store from '../../store';
import { ROUTES } from '../../helpers/routes';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const tooLongName = '123456789012345678901';

describe('Login page', () => {
  afterEach(() => {
    cleanup();
  });

  it('should show errors if the inputs are empty', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ROUTES.LOGIN]}>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const loginButton = screen.getByRole('button');
    await userEvent.click(loginButton);

    const errorMessages = screen.getAllByText('This field must be longer than 5 characters');

    expect(errorMessages.length).toEqual(2);
  });

  it('should show errors if the inputs are too long', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ROUTES.LOGIN]}>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');

    expect(usernameInput).toBeTruthy();
    await userEvent.type(usernameInput, tooLongName);

    expect(passwordInput).toBeTruthy();
    await userEvent.type(passwordInput, tooLongName);

    const loginButton = screen.getByRole('button');
    await userEvent.click(loginButton);

    const errorMessages = screen.getAllByText('This field must be shorter than 20 characters');

    expect(errorMessages.length).toEqual(2);
  });

  it('should show Something went wrong since the API is mocked', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ROUTES.LOGIN]}>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');

    expect(usernameInput).toBeTruthy();
    await userEvent.type(usernameInput, 'test1234');

    expect(passwordInput).toBeTruthy();
    await userEvent.type(passwordInput, 'test1234');

    const loginButton = screen.getByRole('button');
    await userEvent.click(loginButton);

    const errorMessage = screen.getByText('Something went wrong... :(');
    expect(errorMessage).toBeTruthy();
  });

  it('should return an unauthorized error', async () => {
    fetchMock.mockOnce(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      statusText: 'Unauthorized',
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ROUTES.LOGIN]}>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');

    expect(usernameInput).toBeTruthy();
    await userEvent.type(usernameInput, 'test1234');

    expect(passwordInput).toBeTruthy();
    await userEvent.type(passwordInput, 'test1234');

    const loginButton = screen.getByRole('button');
    await userEvent.click(loginButton);

    const errorMessage = screen.getByText('Incorrect username or password!');
    expect(errorMessage).toBeTruthy();
  });

  it('should go through and redirect', async () => {
    fetchMock.mockOnce(JSON.stringify({ token: '12345' }));
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ROUTES.LOGIN]}>
          <Routes>
            <Route path={ROUTES.SERVER_LIST} element={<div>Server List</div>} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');

    expect(usernameInput).toBeTruthy();
    await userEvent.type(usernameInput, 'test1234');

    expect(passwordInput).toBeTruthy();
    await userEvent.type(passwordInput, 'test1234');

    const loginButton = screen.getByRole('button');
    await userEvent.click(loginButton);

    const serverList = screen.getByText('Server List');
    expect(serverList).toBeTruthy();
  });
});
