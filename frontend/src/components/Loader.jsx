import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-[60vh]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-400 border-opacity-50"></div>
    </div>
  );
};

export default Loader;
