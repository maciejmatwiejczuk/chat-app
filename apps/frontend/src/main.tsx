import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ChatPage from './pages/ChatPage/ChatPage';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import './index.css';
import Chat from './components/Chat/Chat';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ChatPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'chat/:chatId',
        element: <Chat />,
      },
    ],
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
