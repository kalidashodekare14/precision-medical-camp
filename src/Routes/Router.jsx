import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import AvailableCamps from "../Pages/AvailableCamps/AvailableCamps";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import ViewDetail from "../Pages/Home/ViewDetails/ViewDetail";
import AvailableDetail from "../Pages/AvailableCamps/AvailableDetail/AvailableDetail";
import PrivateRoute from "../PrivateRoutes/PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/view-detail/:id',
                element: <PrivateRoute><ViewDetail></ViewDetail></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/popular-detail/${params.id}`)
            },
            {
                path: 'available-camps',
                element: <AvailableCamps></AvailableCamps>
            },
            {
                path: '/available-detail/:id',
                element: <PrivateRoute><AvailableDetail></AvailableDetail></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/popular-detail/${params.id}`)
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'sign-up',
                element: <SignUp></SignUp>
            }
        ]
    }
])

export default router