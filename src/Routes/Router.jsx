import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import AvailableCamps from "../Pages/AvailableCamps/AvailableCamps";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import ViewDetail from "../Pages/Home/ViewDetails/ViewDetail";
import AvailableDetail from "../Pages/AvailableCamps/AvailableDetail/AvailableDetail";
import PrivateRoute from "../PrivateRoutes/PrivateRoute";
import DashBoard from "../Pages/Dashboard/DashBoard";
import OrgainzerProfile from "../Pages/Dashboard/OrganizerProfile/OrgainzerProfile";
import AddACamp from "../Pages/Dashboard/AddACamp/AddACamp";
import ManageCamps from "../Pages/Dashboard/ManageCamps/ManageCamps";
import ManageRegisteredCams from "../Pages/Dashboard/ManageRegisteredCams/ManageRegisteredCams";

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
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
        children: [
            {
                path: '/dashboard/organizer-profile',
                element: <OrgainzerProfile></OrgainzerProfile>
            },
            {
                path: '/dashboard/add-a-camp',
                element: <AddACamp></AddACamp>
            },
            {
                path: '/dashboard/manage-camps',
                element: <ManageCamps></ManageCamps>
            },
            {
                path: '/dashboard/manage-registered-camps',
                element: <ManageRegisteredCams></ManageRegisteredCams>
            },
            
        ]
    }
])

export default router