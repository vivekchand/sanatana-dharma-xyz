import { FC, useState } from "react";

interface SubscriptionPopupProps {
  onClose: () => void;
  onSubscribed: () => void; // Add this callback
}
export const SubscriptionPopup: FC<SubscriptionPopupProps> = ({ onClose, onSubscribed }) => {
  const [email, setEmail] = useState(""); // State to capture email input value

  const handleSubscribe = async () => {
        console.log("About to call subscribe endpoint!");
        console.log("email is "+ email);
        const response = await fetch("/api/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email // Include the captured email value
          })
        });
        // Perform subscription actions here (e.g., send email)
        // For now, we'll just trigger the "Subscribed" popup
        onSubscribed();
    };
    
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
            <div className="max-w-[400px] text-center"> {/* Adjust the max-width as needed */}
              <center><img src="https://krishnastore.com/images/cache/1614.jpg" alt="Krishna" className="mb-4 max-h-40 w-auto" /></center>
              <h2 className="text-xl font-semibold mb-2">🌞 Journey to Wisdom 📖</h2>
              <p className="text-sm text-gray-600 mb-4">
                Begin an enlightening journey! Subscribe to our newsletter for daily Bhagavad Gita verses and profound wisdom in your inbox.
              </p>
              <div className="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21"><g fill="none"><circle cx="10.5" cy="10.5" r="10.5" fill="green"></circle><path stroke="#FFF" stroke-width="2" d="M6 11.381 8.735 14 15 8"></path></g></svg>                
                <p className="text-sm text-gray-600">&nbsp;Daily Inspiration</p>
              </div>
              <div className="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21"><g fill="none"><circle cx="10.5" cy="10.5" r="10.5" fill="green"></circle><path stroke="#FFF" stroke-width="2" d="M6 11.381 8.735 14 15 8"></path></g></svg>                
                <p className="text-sm text-gray-600">&nbsp;Deeper Cultural Connection</p>
              </div>
              <div className="flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21"><g fill="none"><circle cx="10.5" cy="10.5" r="10.5" fill="green"></circle><path stroke="#FFF" stroke-width="2" d="M6 11.381 8.735 14 15 8"></path></g></svg>                
                <p className="text-sm text-gray-600">&nbsp;Path to Spiritual Enlightenment</p>
              </div>
              <div className="w-full mb-2"> {/* Email input takes full width */}
                <input
                  type="email"
                  placeholder="Email address"
                  className="border p-2 rounded-md w-full"
                  onChange={(e) => setEmail(e.target.value)} // Capture email input value
                />
              </div>
              <div className="flex flex-col sm:flex-row"> {/* Buttons in separate rows */}
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mb-2 sm:mb-0 sm:mr-2"
                  onClick={handleSubscribe}
                >
                  Subscribe Now
                </button>
                <button
                  className="text-gray-500 text-sm hover:text-gray-700"
                  onClick={onClose}
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};
