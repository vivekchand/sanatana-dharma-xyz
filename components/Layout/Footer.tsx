import { FC} from "react";
import Link from "next/link";
import { SubscriptionPopup } from "../Chat/SubscriptionPopup";
import { SubscribedPopup } from "../Chat/SubscribedPopup";
import { useState } from "react";

export const Footer: FC = () => {
  const [showSubscriptionPopup, setShowSubscriptionPopup] = useState(false);
  const [showSubscribedPopup, setShowSubscribedPopup] = useState(false);

  const handleOpenSubscriptionPopup = () => {
    setShowSubscriptionPopup(true);
  };

  const handleCloseSubscriptionPopup = () => {
    setShowSubscriptionPopup(false);
  };

  const handleSubscribed = async () => {
    // Perform actions after subscription (e.g., send confirmation email)
    // For now, we'll just show the "Subscribed" popup
    setShowSubscribedPopup(true);
  };

  const handleCloseSubscribedPopup = () => {
    setShowSubscriptionPopup(false);
    setShowSubscribedPopup(false);
  };

  return (
    <div className="flex h-[50px] sm:h-[50px] border-t border-neutral-300 py-2 px-8 items-center sm:justify-between justify-center">
      {/* <Link href="/privacy">
        <a className="text-neutral-500 hover:text-primary-500">Privacy Policy</a>
      </Link> */}
      <a
        onClick={handleOpenSubscriptionPopup}
        className="text-neutral-500 hover:text-primary-500 cursor-pointer"
      >
        Subscribe
      </a>
      <Link href="https://www.producthunt.com/posts/sanatanadharma-xyz?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-sanatanadharma-xyz" target="_blank" rel="noopener noreferrer">
        <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=416280&theme=neutral" alt="SanatanaDharma.xyz - Sanatana Dharma Chatbot: Revealing Our Heritage 🕉️ | Product Hunt" style={{ width: '250px', height: '34px' }} width="250" height="54" />
      </Link>
      {showSubscriptionPopup && (
        <SubscriptionPopup onClose={handleCloseSubscriptionPopup} onSubscribed={handleSubscribed} />
      )}
      {showSubscribedPopup && (
        <SubscribedPopup onClose={handleCloseSubscribedPopup} />
      )}
    </div>
  );
};
