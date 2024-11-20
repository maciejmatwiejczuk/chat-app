import { Navigate, Outlet } from 'react-router-dom';
import { useMe } from '../../../api/sessions';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

interface AnonymousRouteProps {
  redirectPath?: string;
}

function AnonymousRoute({ redirectPath = '/' }: AnonymousRouteProps) {
  const { data, isPending } = useMe();

  if (isPending) {
    return <LoadingScreen />;
  }

  if (data) {
    return <Navigate to={redirectPath} />;
  }

  return <Outlet />;
}

export default AnonymousRoute;
