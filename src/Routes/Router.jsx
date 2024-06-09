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
import Analytics from "../Pages/Dashboard/Analytics/Analytics";
import RegisteredCamps from "../Pages/Dashboard/RegisteredCamps/RegisteredCamps";
import ParticipantProfile from "../Pages/Dashboard/ParticipantProfile/ParticipantProfile";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import ManageUpdate from "../Pages/Dashboard/ManageUpdate/ManageUpdate";
import Payment from "../Pages/Dashboard/Payment/Payment";
import OrganizerRoutes from "../PrivateRoutes/OrganizerRoutes";

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
                loader: ({ params }) => fetch(`https://precision-medical-camp-server.vercel.app/popular-detail/${params.id}`)
            },
            {
                path: 'available-camps',
                element: <AvailableCamps></AvailableCamps>
            },
            {
                path: '/available-detail/:id',
                element: <PrivateRoute><AvailableDetail></AvailableDetail></PrivateRoute>,
                loader: ({ params }) => fetch(`https://precision-medical-camp-server.vercel.app/popular-detail/${params.id}`)
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
                element: <OrganizerRoutes><AddACamp></AddACamp></OrganizerRoutes>
            },
            {
                path: '/dashboard/manage-camps',
                element: <OrganizerRoutes><ManageCamps></ManageCamps></OrganizerRoutes>
            },
            {
                path: '/dashboard/manage-update/:id',
                element: <OrganizerRoutes><ManageUpdate></ManageUpdate></OrganizerRoutes>,
                loader: ({params}) => fetch(`https://precision-medical-camp-server.vercel.app/popular-medical-camp/${params.id}`)
            },
            {
                path: '/dashboard/manage-registered-camps',
                element: <OrganizerRoutes><ManageRegisteredCams></ManageRegisteredCams></OrganizerRoutes>
            },
            
            // user routes
            {
                path: '/dashboard/analytics',
                element: <PrivateRoute><Analytics></Analytics></PrivateRoute>
            },
            {
                path: '/dashboard/participant-profile',
                element: <PrivateRoute><ParticipantProfile></ParticipantProfile></PrivateRoute>
            },
            {
                path: '/dashboard/registered-camps',
                element: <PrivateRoute><RegisteredCamps></RegisteredCamps></PrivateRoute>
            },
            {
                path: '/dashboard/payment-history',
                element: <PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
            },
            {
                path: '/dashboard/payment/:id',
                element: <PrivateRoute><Payment></Payment></PrivateRoute>,
                loader: ({params}) => fetch(`https://precision-medical-camp-server.vercel.app/camp-register/${params.id}`)
            }
            
            
        ]
    }
])

export default router