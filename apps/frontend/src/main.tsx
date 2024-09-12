import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ChatPage from './pages/ChatPage/index.tsx';
import SignUp from './pages/SignUp/index.tsx';
import SignIn from './pages/SignIn/index.tsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ChatPage />,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
