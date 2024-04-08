import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CommentPage from './pages/CommentPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/features/:featureId/comments',
    element: <CommentPage />,
  },
]);