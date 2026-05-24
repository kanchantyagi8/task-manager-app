import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUserService } from "../services/authService";
import "../styles/RegisterUser.css";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import toast, { Toaster } from "react-hot-toast";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const registerUser = async () => {
    await registerUserService(email, password, firstName, lastName);
    toast.success("User registered successfully");
    resetForm();
  };

  const backToLoginPage = () => {
    navigate("/login");
  };

  const disableRegisterButton = () => {
    if (!emailRegex.test(email)) {
      return true;
    }
    return !email || !password || !firstName || !lastName;
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };

  const showErrorMsg = (inputType: string) => {
    if (inputType === "firstName") {
      if (firstName && firstName.length < 2) {
        return "First name must be at least 2 characters";
      }
    } else if (inputType === "lastName") {
      if (lastName && lastName.length < 2) {
        return "Last name must be at least 2 characters";
      }
    }
    return "";
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <Toaster position="top-right" />
        <h2 className="register-title">Register</h2>

        <Input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name"
          type="text"
          required={true}
          error={showErrorMsg("firstName")}
        />

        <Input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last name"
          type="text"
          required={true}
          error={showErrorMsg("lastName")}
        />

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

        <Button
          variant="primary"
          onClick={registerUser}
          disabled={disableRegisterButton()}
        >
          Register
        </Button>

        <Button variant="secondary" onClick={backToLoginPage}>
          Back
        </Button>
      </div>
    </div>
  );
}
