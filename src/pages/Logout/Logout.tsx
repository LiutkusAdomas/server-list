import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks/hooks';
import { clearToken } from '../../store/slice/tokenSlice';

const Logout: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearToken());
    navigate('/');
  };

  return (
    <div>
      Logout!
      <button
        onClick={handleLogout}
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Sign In
      </button>
    </div>
  );
};

export default Logout;
