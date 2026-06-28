import React from "react";
import classNames from "classnames"; // Optional, helps with conditional classes

const Button = ({
  children,
  type = "button",
  variant = "primary", // primary | danger | outline etc.
  className = "",
  ...rest
}) => {
  const baseStyles = "w-full py-2 rounded text-white font-medium transition";

  const variants = {
    primary: "bg-purple-600 hover:bg-purple-700",
    danger: "bg-red-600 hover:bg-red-700",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-black",
    outline: "border border-purple-500 text-purple-500 hover:bg-purple-900",
    success: "bg-green-600 hover:bg-green-700 text-white", 
  };

  return (
    <button
      type={type}
      className={classNames(baseStyles, variants[variant], className)}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
