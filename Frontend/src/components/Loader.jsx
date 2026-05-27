import React from "react";
import { FiLoader } from "react-icons/fi";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <FiLoader className="animate-spin text-3xl text-indigo-500 mb-3" />
      <p className="text-sm text-gray-400">Loading your library...</p>
    </div>
  );
};

export default Loader;