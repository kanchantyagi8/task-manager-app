import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { loginUserService } from "../services/authService";
import "../styles/Login.css";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await loginUserService(email, password);
      setAuth(res.user, res.token);
      navigate("/dashboard");
    } catch {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const registerUser = () => {
    navigate("/register");
  };

  const handleResetPassword = () => {
    navigate("/reset-password");
  };

  const isDisabled =
    !email ||
    !password ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    password.length < 6;

  return (
    <div className="login-container">
      <div className="login-card">
        <Toaster position="top-right" />

        <h2 className="login-title">Login</h2>

        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          required={true}
        />

        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          required={true}
        />

        <Button variant="primary" onClick={handleLogin} disabled={isDisabled}>
          Login
        </Button>

        <Button variant="secondary" onClick={handleResetPassword}>
          Reset Password
        </Button>

        <Button variant="secondary" onClick={registerUser}>
          Register
        </Button>
      </div>
    </div>
  );
}
