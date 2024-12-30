import { Message } from "@/types";
import { FC } from "react";

interface Props {
  message: Message;
}

export const ChatMessage: FC<Props> = ({ message }) => {
  return (
    <div className={`flex flex-col ${message.role === "assistant" ? "items-start" : "items-end"} animate-fadeIn`}>
      <div
        className={`flex items-center ${message.role === "assistant" ? "bg-neutral-200 text-white" : "bg-blue-500 text-white"} rounded-2xl px-4 py-3 max-w-[67%] whitespace-pre-wrap shadow-md transform transition-all duration-200 hover:scale-[1.02]`}
        style={{ overflowWrap: "anywhere", maxWidth: '77%', background: message.role === "assistant"? "#3d348b": "#fac054", color: message.role === "assistant"? "wheat": "black" }}
      >
        {message.content}
      </div>
      {message.role === "assistant" && (
        <>
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6557627020167681"
            crossOrigin="anonymous"></script>
          <ins className="adsbygoogle"
              style={{display:"block"}}
              data-ad-format="fluid"
              data-ad-layout-key="-gw-3+1f-3d+2z"
              data-ad-client="ca-pub-6557627020167681"
              data-ad-slot="7809100071"></ins>
          <script>
            {`
              (adsbygoogle = window.adsbygoogle || []).push({});
            `}
          </script>
        </>
      )}
    </div>
  );
};
