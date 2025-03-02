import { Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

export default App;
