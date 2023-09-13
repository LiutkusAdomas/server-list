import './App.css';
import { Layout } from './components/ui/Layout/Layout';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from './pages/Login/Login';
import { ServerList } from './pages/ServerList/ServerList';
import { NotFound } from './pages/NotFound/NotFound';
import { Logout } from './pages/Logout/Logout';
import { ROUTES } from './helpers/routes';
import { ProtectedRoute } from './components/route/ProtectedRoute/ProtectedRoute';
import store, { persistor } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path="/" element={<Navigate to="/login" replace />} />

                <Route element={<ProtectedRoute />}>
                  <Route path={ROUTES.SERVER_LIST} element={<ServerList />} />
                  <Route path={ROUTES.LOGOUT} element={<Logout />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </Layout>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
