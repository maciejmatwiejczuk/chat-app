import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

interface AnonymousRouteProps {
  redirectPath?: string;
}

function AnonymousRoute({ redirectPath = '/' }: AnonymousRouteProps) {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    return <Navigate to={redirectPath} />;
  }

  return <Outlet />;
}

export default AnonymousRoute;
