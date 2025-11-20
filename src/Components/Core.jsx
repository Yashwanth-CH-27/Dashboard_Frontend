import React from "react";
import Profile from "./Profile";
import { Link } from "react-router-dom";

const Core = () => {
  return (
    <div>
      <div className="drawer">
        <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <p>
            Welcome back! We're happy to have you here. Explore your dashboard
            to update your profile, create notes, and manage everything in one
            place.
          </p>
          <label htmlFor="my-drawer-1" className="btn drawer-button">
            Open Side-Bar!
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-1"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Core;
