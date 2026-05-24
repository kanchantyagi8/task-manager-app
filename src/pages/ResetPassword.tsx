import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPasswordService } from "../services/authService";
import "../styles/ResetPassword.css";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import toast, { Toaster } from "react-hot-toast";
import type { AxiosError } from "axios";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const resetPassword = async () => {
    try {
      await resetPasswordService(email, password);
      backToLoginPage();
    } catch (error) {
      const err = error as AxiosError<{ msg: string }>;
      toast.error(
        err?.response?.data?.msg ||
          "Failed to reset password. Please try again.",
      );
    }
  };

  const backToLoginPage = () => {
    navigate("/");
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-card">
        <Toaster position="top-right" />
        <h2 className="reset-password-title">Reset Password</h2>

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
          placeholder="New Password"
          type="password"
          required={true}
        />

        <Button
          variant="primary"
          onClick={resetPassword}
          disabled={!email || !password}
        >
          Reset Password
        </Button>

        <Button variant="secondary" onClick={backToLoginPage}>
          Back
        </Button>
      </div>
    </div>
  );
}
