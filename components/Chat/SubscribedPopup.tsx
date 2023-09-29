import { FC } from "react";

interface SubscribedPopupProps {
  onClose: () => void;
}

export const SubscribedPopup: FC<SubscribedPopupProps> = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-md text-center">
        <div className="animate-bounce text-green-500 text-4xl mb-2">
          {/* Big checkmark (tick) */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M14.293 5.293a1 1 0 011.414 0l1 1a1 1 0 01-1.414 1.414L9 7.414l-2.293 2.293a1 1 0 01-1.414-1.414l3-3a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M10 19a9 9 0 100-18 9 9 0 000 18zM1 10a9 9 0 1118 0 9 9 0 01-18 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <p className="text-lg text-gray-600">
          You would have received an email. Please confirm your email.
        </p>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mt-4"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};
