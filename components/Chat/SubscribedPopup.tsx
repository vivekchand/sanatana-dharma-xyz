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
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 21 21"><g fill="none"><circle cx="10.5" cy="10.5" r="10.5" fill="green"></circle><path stroke="#FFF" stroke-width="2" d="M6 11.381 8.735 14 15 8"></path></g></svg>
          </div>
        </div>
        <p className="text-lg text-gray-600">
        Thank you for subscribing!
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
