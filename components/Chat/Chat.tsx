import { Message } from "@/types";
import { FC } from "react";
import { ChatInput } from "./ChatInput";
import { ChatLoader } from "./ChatLoader";
import { ChatMessage } from "./ChatMessage";
import { ResetChat } from "./ResetChat";

interface Props {
  messages: Message[];
  loading: boolean;
  onSend: (message: Message) => void;
  onReset: () => void;
}

export const Chat: FC<Props> = ({ messages, loading, onSend, onReset }) => {
  return (
    <>
      <div className="flex flex-col rounded-lg px-2 sm:p-4 sm:border border-neutral-300 shadow-lg bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
        <div className="flex-grow space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className="transition-all duration-200 ease-in-out"
            >
              <ChatMessage message={message} />
            </div>
          ))}

          {loading && (
            <div className="transition-opacity duration-200 ease-in-out">
              <ChatLoader />
            </div>
          )}
        </div>

        <div className="mt-6 sm:mt-8 bottom-[56px] left-0 w-full">
          <ChatInput onSend={onSend} />
        </div>
      </div>
    </>
  );
};
