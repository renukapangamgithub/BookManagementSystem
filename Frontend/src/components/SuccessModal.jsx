import React, { useEffect } from "react";
import { FiCheck, FiX } from "react-icons/fi";

const MESSAGES = {
  add: {
    title: "Book added successfully",
    sub: "Your new book has been added to the library.",
  },

  update: {
    title: "Book updated successfully",
    sub: "Your changes have been saved successfully.",
  },

  delete: {
    title: "Book deleted successfully",
    sub: "The selected book has been removed.",
  },
};

const SuccessModal = ({ type, onClose }) => {
  useEffect(() => {
    if (!type) return;

    const timer = setTimeout(() => {
      onClose();
    }, 2500);

    return () => clearTimeout(timer);
  }, [type, onClose]);

  if (!type) return null;

  const { title, sub } = MESSAGES[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
      />

      <div
        className="relative w-full max-w-sm bg-white rounded-[30px] shadow-2xl overflow-hidden"
        style={{
          animation: "popup 0.35s ease",
        }}
      >

        <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-b from-green-50 to-transparent" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black transition"
        >
          <FiX size={18} />
        </button>

        <div className="relative flex flex-col items-center px-8 pt-10 pb-8">

          <div className="relative flex items-center justify-center mb-6">

            <div
              className="absolute w-20 h-20 rounded-full bg-green-200 opacity-30"
              style={{
                animation: "ping 1.5s infinite",
              }}
            />

            <div className="absolute w-16 h-16 rounded-full bg-green-100" />

            <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-green-400 shadow-lg">
              <FiCheck className="text-white text-xl" />
            </div>
          </div>

          <h2 className="text-lg font-semibold text-gray-800 text-center">
            {title}
          </h2>

          <p className="text-sm text-gray-400 text-center mt-2 leading-relaxed">
            {sub}
          </p>

          <div className="w-full h-px bg-gray-100 my-5" />

          <div className="flex items-center justify-between w-full text-xs text-gray-400">
            <span>Closing automatically...</span>

            <button
              onClick={onClose}
              className="text-sky-500 hover:text-sky-600 font-medium transition"
            >
              Close now
            </button>
          </div>

          <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden mt-4">
            <div
              className="h-full bg-green-400 rounded-full"
              style={{
                animation: "progress 2.5s linear forwards",
              }}
            />
          </div>
        </div>

        <style>
          {`
            @keyframes popup {
              0% {
                opacity: 0;
                transform: scale(0.8) translateY(20px);
              }

              100% {
                opacity: 1;
                transform: scale(1) translateY(0);
              }
            }

            @keyframes progress {
              from {
                width: 100%;
              }

              to {
                width: 0%;
              }
            }

            @keyframes ping {
              0% {
                transform: scale(1);
                opacity: 0.4;
              }

              70% {
                transform: scale(1.5);
                opacity: 0;
              }

              100% {
                opacity: 0;
              }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default SuccessModal;