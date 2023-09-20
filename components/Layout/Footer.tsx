import ReactGA from "react-ga";
import { FC, useEffect } from "react";
import Link from "next/link";

export const initGA = () => {
  ReactGA.initialize("G-916S3MSTVF"); 
}

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

export const Footer: FC = () => {
  useEffect(() => {
    // Initialize Google Analytics when the component mounts
    initGA();
    // Log the initial page view
    logPageView();
  }, []);

  return (
    <div className="flex h-[30px] sm:h-[50px] border-t border-neutral-300 py-2 px-8 items-center sm:justify-between justify-center">
      <Link href="/privacy">
        <a className="text-neutral-500 hover:text-primary-500">Privacy Policy</a>
      </Link>
    </div>
  );
};
