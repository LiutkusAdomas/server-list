import { useState } from 'react';
import { useGetTokenMutation } from '../../api/playgroundApiService';
import { setToken } from '../../store/slice/tokenSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks/hooks';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { SerializedError } from '@reduxjs/toolkit';
import Button from '../../components/common/Button/Buttons';
import Container from '../../components/common/Container/Container';
import { ROUTES } from '../../routes';
import Input from '../../components/common/Input/Input';
import Spinner from '../../components/common/Spinner/Spinner';
import { FormItem } from '../../model/FormItem.type';
import { validateInput } from '../../helpers/Utilities';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState<FormItem>({ value: '' });
  const [password, setPassword] = useState<FormItem>({ value: '' });
  const [error, setError] = useState<string | undefined>(undefined);
  const [getAuthToken, { isLoading }] = useGetTokenMutation();

  const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setUsername({ value: value });
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setPassword({ value: value });
  };

  const formIsInvalid = (): boolean => {
    const userNameError = validateInput(username.value);
    if (userNameError) {
      setUsername({ ...username, error: userNameError });
    }

    const passwordError = validateInput(password.value);
    if (passwordError) {
      setPassword({ ...password, error: passwordError });
    }

    return !!userNameError || !!passwordError;
  };

  const handleSubmit = () => {
    if (formIsInvalid()) return;

    getAuthToken({ username: username.value, password: password.value })
      .unwrap()
      .then((data) => {
        setError(undefined);
        dispatch(setToken(data.token));
        navigate(ROUTES.SERVER_LIST);
      })
      .catch((error: FetchBaseQueryError | SerializedError) => {
        if ('status' in error && error.status === 401) setError('Incorrect username or password!');
        else setError('Something went wrong... :(');
      });
  };

  return (
    <Container>
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        {error && <h3 className="text-center text-2xl">{error}</h3>}
        <form className="mt-8 space-y-6">
          <div className="-space-y-px">
            <Input
              label="Username"
              control="username"
              type="text"
              autocomplete="username"
              required={true}
              errorMesage={username.error}
              onChange={handleUserName}
            />
            <Input
              label="Password"
              control="password"
              type="password"
              autocomplete="current-password"
              required={true}
              errorMesage={password.error}
              onChange={handlePassword}
            />
          </div>
          <div>
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? (
                <div className="mx-4 h-4 w-4">
                  <Spinner />
                </div>
              ) : (
                'Login'
              )}
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Login;
