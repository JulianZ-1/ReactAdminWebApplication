import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom';
import Main from "../pages/main";
import Mall from '../pages/mall';
import User from '../pages/user/user';
import Home from '../pages/home/home';
import PageOne from '../pages/other/pageOne';
import PageTwo from '../pages/other/pageTwo';

// Define your routes as an array of RouteObject, which is typed by react-router-dom
const routes: RouteObject[] = [
    {
        path: '/',
        element: <Main />,  // Use `element` instead of `Component` in react-router v6
        children: [
            {
                path: '/',
                element: <Navigate to="home" replace />  // Redirect to home
            },
            {
                path: 'home',
                element: <Home />
            },
            {
                path: 'mall',
                element: <Mall />
            },
            {
                path: 'user',
                element: <User />
            },
            {
                path: 'other',
                element: <PageOne />
            }
        ]
    }
];

export default createBrowserRouter(routes);