import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../../../helpers/routes';
import { useAppSelector } from '../../../store/hooks/hooks';

type ProtectedRoutePropsType = {
  redirectPath?: string;
};

export const ProtectedRoute: React.FC<ProtectedRoutePropsType> = ({
  redirectPath = ROUTES.LOGIN,
}) => {
  const token = useAppSelector((state) => state.auth.token);

  if (!token) return <Navigate to={redirectPath} replace />;

  return <Outlet />;
};
