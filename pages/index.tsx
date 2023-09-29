import { Chat } from "@/components/Chat/Chat";
import { Footer } from "@/components/Layout/Footer";
import { Navbar } from "@/components/Layout/Navbar";
import { Message } from "@/types";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { Analytics } from '@vercel/analytics/react';
 
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
      setTimeout(() => {
        setShowSubscriptionPopup(true);
      }, 5000); // Show after 5 seconds
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
    // let jsonMessages;
    setMessages(updatedMessages);
    setLoading(true);
    // jsonMessages = JSON.stringify({
    //   messages: [...messages, message, {
    //     role: "system",
    //     content: `Restrict the topic only to Vedas: Discover the ancient scriptures that form the foundation of Sanatana Dharma philosophy.
    //     Upanishads: Explore the profound teachings found within the Upanishads.
    //     Bhagavad Gita: Learn about the epic conversation between Lord Krishna and Arjuna.
    //     Manusmriti: Understand the principles of dharma as outlined in this ancient text.
    //     Puranas: Dive into the captivating stories and mythologies of Hinduism.
    //     Science in Vedas: Uncover the scientific knowledge embedded in the Vedas.
    //     Yoga and Meditation: Explore the practices of physical and mental well-being.
    //     Dharma and Karma: Gain insights into the concepts of duty and karma.
    //     Deities and Worship: Discover the diverse Hindu deities and their significance.
    //     Temples and Pilgrimage: Learn about sacred places and their cultural importance.
    //     Ayurveda: Explore the holistic system of natural healing.
    //     Philosophical Schools: Delve into the various schools of Hindu philosophy.
    //     Rituals and Festivals: Understand the customs and celebrations of Hinduism.
    //     History and Evolution: Trace the historical journey of Sanatana Dharma.
    //     Other Texts: Find information on texts like the Ramayana, Mahabharata, and more.
    //     Modern Interpretations: Learn how Hinduism is practiced and adapted in the modern world.

    //     Please feel free to ask related to Sanatana Dharma
    //     `
    //   }]
    // });

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: updatedMessages
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
        content: `Welcome to the Sanatana Dharma Chatbot, your guide to Hinduism. I'm here to answer questions about Vedas, Upanishads, Bhagavad Gita, Puranas, Science in Vedas, Yoga, Dharma, Deities, Temples, Ayurveda, Philosophy, Rituals, History, and more. Ask anything, and let's explore Hinduism together!`
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
        content: `Welcome to the Sanatana Dharma Chatbot, your guide to Hinduism. I'm here to answer questions about Vedas, Upanishads, Bhagavad Gita, Puranas, Science in Vedas, Yoga, Dharma, Deities, Temples, Ayurveda, Philosophy, Rituals, History, and more. Ask anything, and let's explore Hinduism together!`
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

        <div className="flex-1 overflow-auto sm:px-10 pb-4 sm:pb-10">
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
        <Footer />
      </div>
      <Analytics />
      {/* Subscription Popup */}
      {showSubscriptionPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-md flex">
            <div className="w-2/3 pr-4">
              <h2 className="text-xl font-semibold mb-2">🌞 Journey to Wisdom 📖</h2>
              <p className="text-sm text-gray-600 mb-4">
                Welcome to a journey of spiritual growth! Subscribe to our newsletter to receive daily Bhagavad Gita verses, ancient wisdom from Vedas, Upanishads, and more, directly in your inbox.
              </p>
              <div className="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.293 9.293a1 1 0 011.414-1.414L9 12.586l6.293-6.293a1 1 0 111.414 1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 011.414-1.414z" clipRule="evenodd" />
                </svg>
                <p className="text-green-500">Daily Inspiration</p>
              </div>
              <div className="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.293 9.293a1 1 0 011.414-1.414L9 12.586l6.293-6.293a1 1 0 111.414 1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 011.414-1.414z" clipRule="evenodd" />
                </svg>
                <p className="text-green-500">Deeper Cultural Connection</p>
              </div>
              <div className="flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.293 9.293a1 1 0 011.414-1.414L9 12.586l6.293-6.293a1 1 0 111.414 1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 011.414-1.414z" clipRule="evenodd" />
                </svg>
                <p className="text-green-500">Path to Spiritual Enlightenment</p>
              </div>
              <input
                type="email"
                placeholder="Email address"
                className="border p-2 rounded-md mb-2"
              />
              <button
                className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                onClick={handleCloseSubscriptionPopup}
              >
                Subscribe Now
              </button>
              <button
                className="text-gray-500 text-sm mt-2 hover:text-gray-700"
                onClick={handleCloseSubscriptionPopup}
              >
                Dismiss
              </button>
            </div>
            <div className="w-1/3">
              <img src="/sanatan-photo.jpg" alt="Sanatan" className="rounded-md" />
            </div>
          </div>
        </div>
      )}

      {/* Button to open the Subscription Popup */}
      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        onClick={handleOpenSubscriptionPopup}
      >
        Subscribe
      </button>

    </>
  );
}
