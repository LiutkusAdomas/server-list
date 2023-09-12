import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks/hooks';
import { clearToken } from '../../store/slice/tokenSlice';
import Button from '../../components/common/Button/Buttons';
import Container from '../../components/common/Container/Container';
import { ROUTES } from '../../routes';
import { playgroundApi } from '../../api/playgroundApiService';

const Logout: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearToken());
    dispatch(playgroundApi.util.resetApiState());
    navigate(ROUTES.SERVER_LIST);
  };

  return (
    <Container>
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
            When logged out, you will be taken back to the login screen and will no longer be able
            to see the Server List. Continue?
          </h2>
        </div>
        <Button onClick={handleLogout} label={'Logout'} />
      </div>
    </Container>
  );
};

export default Logout;
