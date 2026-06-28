import React from "react";

const FormWrapper = ({ children, title }) => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-[#1E1E1E] text-gray-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center text-white">{title}</h2>
      <div>{children}</div>
    </div>
  );
};

export default FormWrapper;
