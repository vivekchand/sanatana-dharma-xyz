import { Message } from "@/types";
import { FC } from "react";

interface Props {
  message: Message;
}

export const ChatMessage: FC<Props> = ({ message }) => {
  return (
    <div className={`flex flex-col ${message.role === "assistant" ? "items-start" : "items-end"}`}>
      <div
        className={`flex items-center ${message.role === "assistant" ? "bg-neutral-200 text-neutral-900" : "bg-blue-500 text-white"} rounded-2xl px-3 py-2 max-w-[67%] whitespace-pre-wrap`}
        style={{ overflowWrap: "anywhere", maxWidth: '77%' }}
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
