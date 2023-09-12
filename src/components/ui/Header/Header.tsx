import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Buttons';
import { ROUTES } from '../../../helpers/routes';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const logoutHandler = () => {
    navigate(ROUTES.LOGOUT);
  };

  return (
    <header className="shadow-md absolute w-full flex justify-between gap-x-4 items-center p-4 bg-gray-50">
      <div>Hello and welcome to my App!</div>
      <div>
        {location.pathname !== ROUTES.LOGIN && <Button onClick={logoutHandler} label="Logout" />}
      </div>
    </header>
  );
};

export default Header;
