import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ChatPage from './pages/ChatPage/ChatPage';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import './index.css';
import Chat from './components/Chat/Chat';
import ProtectedRoute from './components/_common/ProtectedRoute/ProtectedRoute';
import App from './App';
import AnonymousRoute from './components/_common/AnonymousRoute/AnonymousRoute';
import ChatPlaceholder from './components/Chat/ChatPlaceholder/ChatPlaceholder';

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/',
            element: <ChatPage />,
            children: [
              {
                path: '/',
                element: <ChatPlaceholder />,
              },
              {
                path: 'chat/:chatId',
                element: <Chat />,
              },
            ],
          },
        ],
      },
      {
        element: <AnonymousRoute />,
        children: [
          {
            path: '/sign-in',
            element: <SignIn />,
          },
          {
            path: '/sign-up',
            element: <SignUp />,
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
