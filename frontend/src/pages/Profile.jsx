import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

function Profile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/auth/profile");
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="app-container">
      <Navbar />

      <div className="main-content">
        <div className="profile-container">

          <div className="profile-header">
            <div className="profile-avatar">
              👤
            </div>

            <h1>Profile</h1>
          </div>

          <div className="profile-card">

            <div className="profile-info-grid">

              <div className="profile-info-box">
                <div className="profile-label">
                  Full Name
                </div>

                <div className="profile-value">
                  {user.name}
                </div>
              </div>

              <div className="profile-info-box">
                <div className="profile-label">
                  Email Address
                </div>

                <div className="profile-value">
                  {user.email}
                </div>
              </div>

              <div className="profile-info-box">
                <div className="profile-label">
                  Member Since
                </div>

                <div className="profile-value">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "Not Available"}
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;