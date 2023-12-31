import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks/hooks';
import { clearToken } from '../../store/slice/tokenSlice';
import { Button } from '../../components/common/Button/Buttons';
import { Container } from '../../components/common/Container/Container';
import { ROUTES } from '../../helpers/routes';
import { playgroundApi } from '../../api/playgroundApiService';
import { Heading } from '../../components/common/Heading/Heading';

type LogoutPropsType = {
  redirectPath?: string;
};

export const Logout: React.FC<LogoutPropsType> = ({ redirectPath = ROUTES.LOGIN }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearToken());
    dispatch(playgroundApi.util.resetApiState());
    navigate(redirectPath);
  };

  return (
    <Container additional="max-w-md">
      <Heading>
        When logged out, you will be taken back to the login screen and will no longer be able to
        see the Server List. Continue?
      </Heading>
      <Button onClick={handleLogout} label={'Logout'} />
    </Container>
  );
};
