import { FC } from "react";

export const Navbar: FC = () => {
  return (
    <div className="flex h-[50px] sm:h-[60px] border-b border-neutral-300 py-2 px-2 sm:px-8 items-center justify-between">
      <div className="text-3xl flex items-center">
        <a
          className="ml-2 hover:opacity-50"
          href="https://sanatanadharma.xyz"
        >
          Sanātana Dharma
        </a>
      </div>
      <div>
        <a
          className="border-2 rounded-full py-2 px-3 shadow-md"
          style={{color: 'white', background: 'black'}}
          target="_blank"
          href="http://shop.sanatanadharma.xyz"
        >
          Products
        </a>
      </div>
    </div>
  );
};
