import { Navigate, Outlet } from 'react-router-dom';
import { useMe } from '../../../api/sessions';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

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

  return <Outlet />;
}

export default ProtectedRoute;
