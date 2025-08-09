import React from "react";

// Loading spinner for the button's loading state
const LoadingSpinner = () => (
  <div className="w-5 h-5 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
);

export const Button = ({
  children,
  className = "",
  loading = false,
  disabled = false,
  type = "button", // Default type is "button"
  ...props
}) => {
  return (
    <button
      type={type}
      className={`text-green-500 hover:text-green-700 font-medium 
        transition-all duration-300 ease-in-out
        ${disabled ? "bg-gray-400 cursor-not-allowed" : ""} 
        ${loading ? "cursor-wait" : ""} 
        ${className}
        hover:font-bold`} // Hover effect for text color and font weight only (no size change)
      disabled={disabled || loading} // Disable the button if it's loading or manually disabled
      {...props}
    >
      {loading ? <LoadingSpinner /> : children}
    </button>
  );
};
