import './App.css';
import Layout from './components/ui/Layout/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import ServerList from './pages/ServerList/ServerList';
import NotFound from './pages/NotFound/NotFound';
import Logout from './pages/Logout/Logout';
import { Provider } from 'react-redux';
import store, { persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<ServerList />} />
                <Route path="login" element={<Login />} />
                <Route path="logout" element={<Logout />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
