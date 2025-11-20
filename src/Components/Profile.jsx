import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
    const user = useSelector((store) => store.user)
    const {firstName, lastName, age, gender} = user
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">This is your profile data!</h1>
            <p className="py-6">
              You can view and edit your profile here.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                <label className="label">First Name</label>
                <input value={firstName} type="text" className="input" />
                <label className="label">Last Name</label>
                <input
                  value={lastName}   
                  type="text"
                  className="input"
                  
                />
                <label className="label">Age</label>
                <input value={age} type="text" className="input" />
                <label className="label">Gender</label>
                <input value={gender} type="text" className="input" />
                <button className="btn btn-neutral mt-4">Login</button>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
