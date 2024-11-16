import { Navigate, Outlet } from 'react-router-dom';
import { useMe } from '../../../api/sessions';

interface AnonymousRouteProps {
  redirectPath?: string;
}

function AnonymousRoute({ redirectPath = '/' }: AnonymousRouteProps) {
  const { data } = useMe();

  if (data) {
    return <Navigate to={redirectPath} />;
  }

  return <Outlet />;
}

export default AnonymousRoute;
