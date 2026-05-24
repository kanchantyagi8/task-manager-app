import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import "../styles/Profile.css";
import Button from "../components/common/Button";

export default function Profile() {
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  const backToDashboardPage = () => {
    navigate("/dashboard");
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1 className="profile-title">Profile</h1>

        <div className="profile-info">
          <span className="label">Name</span>
          <p>
            {user?.firstName} {user?.lastName}
          </p>
        </div>

        <div className="profile-info">
          <span className="label">Email</span>
          <p>{user?.email}</p>
        </div>

        <Button variant="secondary" onClick={backToDashboardPage}>
          Back
        </Button>
      </div>
    </div>
  );
}
