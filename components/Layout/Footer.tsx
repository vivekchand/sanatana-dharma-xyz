import { FC, useEffect } from "react";
import Link from "next/link";

export const Footer: FC = () => {
  return (
    <div className="flex h-[30px] sm:h-[50px] border-t border-neutral-300 py-2 px-8 items-center sm:justify-between justify-center">
      <Link href="/privacy">
        <a className="text-neutral-500 hover:text-primary-500">PrivacyPolicy</a>
      </Link>
      <Link href="https://www.producthunt.com/posts/sanatanadharma-xyz?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-sanatanadharma-xyz" target="_blank" rel="noopener noreferrer">
          <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=416280&theme=neutral" alt="SanatanaDharma.xyz - Sanatana Dharma Chatbot: Revealing Our Heritage 🕉️ | Product Hunt" style={{ width: '250px', height: '34px' }} width="250" height="54" />
      </Link>
    </div>
  );
};
