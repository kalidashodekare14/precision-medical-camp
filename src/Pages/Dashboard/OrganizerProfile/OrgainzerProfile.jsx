import useAuth from "../../../Hooks/useAuth";





const OrgainzerProfile = () => {

    const { user } = useAuth()

    return (
        <div className="min-h-screen flex  justify-center items-center">
            <div className=" card w-[70%]  bg-base-100 shadow-xl p-5">
                <div className="flex">
                    <figure><img className="w-full h-[50vh]" src={user.photoURL} alt="Shoes" /></figure>
                    <div className="card-body space-y-3">
                        <div className="text-center">
                            <h2 className="card-title text-4xl">My profile</h2>
                        </div>
                        <div>
                            <span>{user?.displayName}</span>
                        </div>
                        <div>
                            <span>{user?.email}</span>
                        </div>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrgainzerProfile; <h1>this is profile</h1>