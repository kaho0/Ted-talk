import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import UserDash from '../pages/Dashboard/UserDashboard/UserDash'
import Container from '../components/Shared/Container'
import NewPost from '../pages/Dashboard/UserDashboard/NewPost'
import UserDashboard from '../layouts/UserDashboard'
import UserProfile from '../pages/Dashboard/UserDashboard/UserProfile'
import CreatePostForm from '../pages/Dashboard/UserDashboard/NewPost'
import Allpost from '../pages/Blogs/AllBlogs'
import ManagePosts from '../pages/Dashboard/UserDashboard/ManagePosts'
import Interactions from '../pages/Dashboard/UserDashboard/Interactions'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },


    ],
  },

  {
    path: '/dash',
    element: <Container><UserDashboard></UserDashboard></Container>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/dash/profile',
        element: <UserProfile></UserProfile>,
      },
      {
        path: '/dash/post',
        element: <CreatePostForm></CreatePostForm>,
      },
      {
        path: '/dash/manage',
        element: <ManagePosts></ManagePosts>,
      },
      {
        path: '/dash/interactions',
        element: <Interactions></Interactions>,
      },

    ],
  },

  { path: '/posts', element: <Allpost></Allpost> },

  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
])
