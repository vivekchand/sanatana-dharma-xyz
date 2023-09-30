import { Chat } from "@/components/Chat/Chat";
import { Footer } from "@/components/Layout/Footer";
import { Navbar } from "@/components/Layout/Navbar";
import { Message } from "@/types";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { Analytics } from '@vercel/analytics/react';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showSubscriptionPopup, setShowSubscriptionPopup] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Load the subscription popup state from local storage
  useEffect(() => {
    const lastDismissedTime = localStorage.getItem("subscriptionDismissedTime");
    if (!lastDismissedTime || Date.now() - parseInt(lastDismissedTime) > 24 * 60 * 60 * 1000) {
      // If the popup was dismissed more than 24 hours ago or never dismissed, show it
      // setTimeout(() => {
      //   setShowSubscriptionPopup(true);
      // }, 5000); // Show after 5 seconds
    }
  }, []);

  // Function to handle opening the subscription popup
  const handleOpenSubscriptionPopup = () => {
    setShowSubscriptionPopup(true);
  };

  // Function to handle closing the subscription popup
  const handleCloseSubscriptionPopup = () => {
    setShowSubscriptionPopup(false);
    // Save the current time to local storage when the popup is dismissed
    localStorage.setItem("subscriptionDismissedTime", Date.now().toString());
  };

  
  const handleSend = async (message: Message) => {
    let updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    setLoading(true);


    // Check if a requestId already exists in session storage
    let requestId = sessionStorage.getItem('requestId') || uuidv4();

    // Function to clear requestId from session storage
    const clearRequestId = () => {
      sessionStorage.removeItem('requestId');
    };

    // Add an event listener for beforeunload (page refresh or tab close)
    window.addEventListener('beforeunload', clearRequestId);

    // If requestId doesn't exist, store it in session storage
    if (!requestId) {
      sessionStorage.setItem('requestId', requestId);
    }

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: updatedMessages,
        requestId: requestId,
      })
    });

    if (!response.ok) {
      setLoading(false);
      throw new Error(response.statusText);
    }

    const data = response.body;

    if (!data) {
      return;
    }

    setLoading(false);

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let isFirst = true;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      if (isFirst) {
        isFirst = false;
        setMessages((messages) => [
          ...messages,
          {
            role: "assistant",
            content: chunkValue
          }
        ]);
      } else {
        setMessages((messages) => {
          const lastMessage = messages[messages.length - 1];
          const updatedMessage = {
            ...lastMessage,
            content: lastMessage.content + chunkValue
          };
          return [...messages.slice(0, -1), updatedMessage];
        });
      }
    }
  };

  const handleReset = () => {
    setMessages([
      {
        role: "assistant",
        content: `Namaste 🙏 I'm Sanatana Dharma Chatbot, your guide to Hinduism. I'm here to answer questions about Vedas, Upanishads, Bhagavad Gita, Puranas, Science in Vedas, Yoga, Dharma, Deities, Temples, Ayurveda, Philosophy, Rituals, History, and more. Ask anything, and let's explore Hinduism together!`
      }
    ]);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: `Namaste 🙏 I'm Sanatana Dharma Chatbot, your guide to Hinduism. I'm here to answer questions about Vedas, Upanishads, Bhagavad Gita, Puranas, Science in Vedas, Yoga, Dharma, Deities, Temples, Ayurveda, Philosophy, Rituals, History, and more. Ask anything, and let's explore Hinduism together!`
      }
    ]);
  }, []);

  return (
    <>
      <Head>
        <title>SanatanaDharma.xyz</title>
        <meta
          name="description"
          content="I'm Sanatana Dharma Chatbot, an AI assistant. I can help you with things like answering questions and providing information about Sanatana Dharma."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6557627020167681"
          crossOrigin="anonymous"></script>
        <script async type="text/javascript">
          {`
          window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};
          heap.load("1873562240");
        `}
        </script>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-916S3MSTVF" />
        <script async id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
  
            gtag('config', 'G-916S3MSTVF');
          `}
        </script>        
      </Head>

      <div className="flex flex-col h-screen">
        <Navbar />

        <div className="flex-1 overflow-auto sm:px-10 pb-4 sm:pb-10" style={{backgroundColor: "#eef0ff"}}>
          <div className="max-w-[800px] mx-auto mt-4 sm:mt-12">
            <Chat
              messages={messages}
              loading={loading}
              onSend={handleSend}
              onReset={handleReset}
            />
            <div ref={messagesEndRef} />
          </div>
        </div>
        {/* <Footer /> */}
      </div>
      <Analytics />
      {/* Subscription Popup */}
      {showSubscriptionPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
            <div className="max-w-[400px] text-center"> {/* Adjust the max-width as needed */}
              <h2 className="text-xl font-semibold mb-2">🌞 Journey to Wisdom 📖</h2>
              <p className="text-sm text-gray-600 mb-4">
                Welcome to a journey of spiritual growth! Subscribe to our newsletter to receive daily Bhagavad Gita verses, ancient wisdom from Vedas, Upanishads, and more, directly in your inbox.
              </p>
              <div className="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21"><g fill="none"><circle cx="10.5" cy="10.5" r="10.5" fill="green"></circle><path stroke="#FFF" stroke-width="2" d="M6 11.381 8.735 14 15 8"></path></g></svg>                
                <p className="text-black-500">&nbsp;Daily Inspiration</p>
              </div>
              <div className="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21"><g fill="none"><circle cx="10.5" cy="10.5" r="10.5" fill="green"></circle><path stroke="#FFF" stroke-width="2" d="M6 11.381 8.735 14 15 8"></path></g></svg>                
                <p className="text-black-500">&nbsp;Deeper Cultural Connection</p>
              </div>
              <div className="flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21"><g fill="none"><circle cx="10.5" cy="10.5" r="10.5" fill="green"></circle><path stroke="#FFF" stroke-width="2" d="M6 11.381 8.735 14 15 8"></path></g></svg>                
                <p className="text-black-500">&nbsp;Path to Spiritual Enlightenment</p>
              </div>
              <div className="w-full mb-2"> {/* Email input takes full width */}
                <input
                  type="email"
                  placeholder="Email address"
                  className="border p-2 rounded-md w-full"
                />
              </div>
              <div className="flex flex-col sm:flex-row"> {/* Buttons in separate rows */}
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mb-2 sm:mb-0 sm:mr-2"
                  onClick={handleCloseSubscriptionPopup}
                >
                  Subscribe Now
                </button>
                <button
                  className="text-gray-500 text-sm hover:text-gray-700"
                  onClick={handleCloseSubscriptionPopup}
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
