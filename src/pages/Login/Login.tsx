import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Credentials } from '../../model/Credentials.type';
import { useGetTokenMutation } from '../../api/playgroundApiService';
import { setToken } from '../../store/slice/tokenSlice';
import { StoreDispatch } from '../../store';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  // eslint-disable-next-line
  const dispatch = useDispatch<StoreDispatch>();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<Credentials>({ username: '', password: '' });
  const [getAuthToken, { data: authTokenData, error }] = useGetTokenMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // eslint-disable-next-line
    getAuthToken(credentials);
  };

  useEffect(() => {
    if (authTokenData) {
      // eslint-disable-next-line
      dispatch(setToken(authTokenData.token));
      sessionStorage.setItem('token', authTokenData.token);
      navigate('/');
    }
  }, [authTokenData, dispatch, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        {error && <h3 className="text-center text-2xl">Incorrect username or password!</h3>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label className="sr-only" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={credentials.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="sr-only" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
