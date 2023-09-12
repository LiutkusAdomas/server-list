import './App.css';
import Layout from './components/ui/Layout/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import ServerList from './pages/ServerList/ServerList';
import NotFound from './pages/NotFound/NotFound';
import Logout from './pages/Logout/Logout';
import { ROUTES } from './helpers/routes';
import { useAppSelector } from './store/hooks/hooks';
import ProtectedRoute from './components/common/ProtectedRoute/ProtectedRoute';

function App() {
  const token = useAppSelector((state) => state.auth.token);

  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route index path={ROUTES.LOGIN} element={<Login />} />

            <Route element={<ProtectedRoute token={token} />}>
              <Route path={ROUTES.SERVER_LIST} element={<ServerList />} />
              <Route path={ROUTES.LOGOUT} element={<Logout />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
