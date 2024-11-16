import { Navigate, Outlet } from 'react-router-dom';
import { useMe } from '../../../api/sessions';

interface ProtectedRouteProps {
  redirectPath?: string;
}

function ProtectedRoute({ redirectPath = '/sign-in' }: ProtectedRouteProps) {
  const { data } = useMe();

  if (!data) {
    return <Navigate to={redirectPath} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
