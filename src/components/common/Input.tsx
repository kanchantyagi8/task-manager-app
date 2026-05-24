import "../../styles/Input.css";

type InputProps = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  type?: "text" | "password" | "email";
  placeholder?: string;
  required?: boolean;
  error?: string;
  value?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export default function Input({
  onChange,
  disabled = false,
  type = "text",
  placeholder = "",
  required = false,
  error = "",
  value = "",
  onKeyDown,
}: InputProps) {
  const getValidationError = () => {
    if (type === "email") {
      if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return "Please enter valid email";
      }
    }

    if (type === "password") {
      if (value && value.length < 6) {
        return "Password must be at least 6 characters";
      }
    }

    return "";
  };

  const finalError = error || getValidationError();

  return (
    <div className="input-wrapper">
      <input
        className={`custom-input ${finalError ? "error" : ""}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        required={required}
        onKeyDown={onKeyDown}
      />

      {finalError && <p className="error-text">{finalError}</p>}
    </div>
  );
}
