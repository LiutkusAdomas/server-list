// eslint-disable-next-line testing-library/no-manual-cleanup
import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Header } from '../../../components/ui/Header/Header';
import { ROUTES } from '../../../helpers/routes';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('Header component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render without the logout button', () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.LOGIN]}>
        <Header />
      </MemoryRouter>
    );

    const logoutButton = screen.queryByRole('button');

    expect(logoutButton).not.toBeTruthy();
  });

  it('should render with the logout button', () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.SERVER_LIST]}>
        <Header />
      </MemoryRouter>
    );

    const logoutButton = screen.getByRole('button');

    expect(logoutButton).toBeTruthy();
  });

  it('should redirect to logout when clicked', async () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.SERVER_LIST]}>
        <Routes>
          <Route path={ROUTES.LOGOUT} element={<div>Logout</div>} />
          <Route path="*" element={<Header />} />
        </Routes>
      </MemoryRouter>
    );

    const logoutButton = screen.getByRole('button');
    await userEvent.click(logoutButton);

    const logout = screen.getByText('Logout');
    expect(logout).toBeTruthy();
  });
});
