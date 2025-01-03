import { FC, useState } from "react";


export const SubscriptionPopup = ({ onClose, onSubscribed }) => {
  const [email, setEmail] = useState(""); // State to capture email input value
  const [isEmailInvalid, setIsEmailInvalid] = useState(false); // State to track email validation

  const isEmailValid = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isWhatsAppNumberValid = (phoneNumber) => {
    // Regular expression for WhatsApp number validation in E.164 format
    const whatsappRegex = /^\+(?:\d{1,3})?\d{9,15}$/;
    return whatsappRegex.test(phoneNumber);
  };
  
  const handleSubscribe = async () => {
    if (!isWhatsAppNumberValid(email) && !isEmailValid(email)) {
      // Email is not valid, set isEmailInvalid state to true
      setIsEmailInvalid(true);
      return;
    }

    console.log("About to call subscribe endpoint!");
    console.log("email is " + email);

    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email, // Include the captured email value
      }),
    });
    window.gtag('config', 'AW-625688952');
    window.gtag('event', 'conversion', {
      'send_to': 'AW-625688952/kLtzCOvnoOsYEPiCraoC',
      'value': 1.0,
      'currency': 'INR'
    });
    onSubscribed();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col">
          <div className="max-w-[400px]"> {/* Adjust the max-width as needed */}
            <center><img src="https://miro.medium.com/v2/resize:fit:602/1*IwlN7l8uBnXltYxOFfAiFQ.jpeg" alt="Krishna" className="mb-4 max-h-40 w-auto" /></center>

            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">🌞 Subscribe to Daily Wisdom 📖</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
            Embark on an enlightening journey! Subscribe to learn one verse a day from the Bhagavad Gita, Vedas, Upanishads, and transform yourself in a year.
            </p>
            <p className="text-sm text-gray-600 mb-2">
            🔹 Receive daily verses with explanation
            </p>
            {/* <p className="text-sm text-gray-600 mb-2">
            🔹 Choose between Email or WhatsApp
            </p> */}
            <p className="text-sm text-gray-600 mb-2">
            🔹 Begin your transformative journey today!
            </p>
            <div className="w-full mb-2"> 
              <input
                type="email"
                placeholder="Email"
                className={`border p-2 rounded-md w-full ${isEmailInvalid ? 'border-red-500' : ''}`} // Add red border if email is invalid
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsEmailInvalid(false);
                }}
              />
            </div>
            <div className="flex flex-col sm:flex-row"> 
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