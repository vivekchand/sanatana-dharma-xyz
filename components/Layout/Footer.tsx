import { FC } from "react";
import Link from "next/link";

export const Footer: FC = () => {
  return (
    <div className="flex h-[30px] sm:h-[50px] border-t border-neutral-300 py-2 px-8 items-center sm:justify-between justify-center">
      <Link href="/privacy">
        <a className="text-neutral-500 hover:text-primary-500">Privacy Policy</a>
      </Link>
    </div>
  );
};
