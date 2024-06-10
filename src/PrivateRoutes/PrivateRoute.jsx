import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { ThreeCircles } from "react-loader-spinner";

const PrivateRoute = ({ children }) => {

    const { user, loading } = useAuth()
    const location = useLocation()
    console.log(location)
    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">
            <ThreeCircles
                visible={true}
                height="100"
                width="100"
                color="#4fa94d"
                ariaLabel="three-circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    }

    if (user) {
        return children
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;