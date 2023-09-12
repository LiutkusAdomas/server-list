import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../../../helpers/routes';

type ProtectedRoutePropsType = {
  token?: string;
  redirectPath?: string;
};

const ProtectedRoute: React.FC<ProtectedRoutePropsType> = ({
  token,
  redirectPath = ROUTES.LOGIN,
}) => {
  if (!token) return <Navigate to={redirectPath} replace />;

  return <Outlet />;
};

export default ProtectedRoute;
