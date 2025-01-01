import { Navigate, Outlet } from 'react-router-dom';
import { useMe } from '../../../api/sessions';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { socket } from '../../../config/socket';

interface ProtectedRouteProps {
  redirectPath?: string;
}

function ProtectedRoute({ redirectPath = '/sign-in' }: ProtectedRouteProps) {
  const { data, isPending } = useMe();

  if (isPending) {
    return <LoadingScreen />;
  }

  if (!data) {
    return <Navigate to={redirectPath} />;
  }

  if (socket.disconnected) {
    socket.connect();
  }

  return <Outlet />;
}

export default ProtectedRoute;
