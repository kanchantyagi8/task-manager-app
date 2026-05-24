import "../../styles/Button.css";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "save"
    | "edit"
    | "clear-search-btn"
    | "filter-button"
    | "active-button";
  type?: "button" | "submit";
};

export default function Button({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`custom-button ${variant}`}
    >
      {children}
    </button>
  );
}
