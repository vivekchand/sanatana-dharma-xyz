import { Chat } from "@/components/Chat/Chat";
import { Navbar } from "@/components/Layout/Navbar";
import { Footer } from "@/components/Layout/Footer";
import { Message } from "@/types";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { Analytics } from '@vercel/analytics/react';
import { v4 as uuidv4 } from 'uuid';
import { SubscriptionPopup } from "../components/Chat/SubscriptionPopup";
import { SubscribedPopup } from "../components/Chat/SubscribedPopup";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showSubscriptionPopup, setShowSubscriptionPopup] = useState(false);
  const [showSubscribedPopup, setShowSubscribedPopup] = useState(false);

  const handleSubscribed = async () => {
    // Perform actions after subscription (e.g., send confirmation email)
    // For now, we'll just show the "Subscribed" popup
    localStorage.setItem("subscribedTime", Date.now().toString());
    setShowSubscribedPopup(true);
  };

  const handleCloseSubscribedPopup = () => {
    setShowSubscribedPopup(false);
    setShowSubscriptionPopup(false);
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const showPopup = () => {
    const lastDismissedTime = localStorage.getItem("subscriptionDismissedTime");
    const subscribedTime = localStorage.getItem("subscribedTime");
    if(subscribedTime) {
      return;
    }
    if(messages.length < 1) {
      return;
    }
    if (!lastDismissedTime || Date.now() - parseInt(lastDismissedTime) > 5 * 60 * 1000) {
      setTimeout(() => {
        setShowSubscriptionPopup(true);
      }, 5000); // Show after 5 seconds
    }
  }

  // Load the subscription popup state from local storage
  useEffect(() => {
    showPopup();
  }, []);

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

    sessionStorage.setItem('requestId', requestId);

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
    showPopup();
  };

  const handleReset = () => {
    setMessages([
      {
        role: "assistant",
        content:"🙏 Namaste! I'm Sanatana Dharma Chatbot, your AI assistant for Bhagavad Gita, Vedas, Puranas, Yoga, and healthy living. Discover insights about karma, the Gayatri Mantra, Vedic interpretations, and more.\n\nCurious? Ask questions like:\n🔹 Karma's profound concept.\n🔹 The depth of the Gayatri Mantra.\n🔹 Time's significance in the Vedas.\n🔹 Tips for a balanced life."
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
        content:"🙏 Namaste! I'm Sanatana Dharma Chatbot, your AI assistant for Bhagavad Gita, Vedas, Puranas, Yoga, and healthy living. Discover insights about karma, the Gayatri Mantra, Vedic interpretations, and more.\n\nCurious? Ask questions like:\n🔹 Karma's profound concept.\n🔹 The depth of the Gayatri Mantra.\n🔹 Time's significance in the Vedas.\n🔹 Tips for a balanced life."
    }
    ]);
  }, []);

  return (
    <>
      <Head>
        <title>SanatanaDharma.xyz</title>
        <meta
          name="description"
          content="🙏 Namaste! I'm Sanatana Dharma Chatbot, your AI assistant for Bhagavad Gita, Vedas, Puranas, Yoga, and healthy living. Discover insights about karma, the Gayatri Mantra, Vedic interpretations, and more.

          Curious? Ask questions like:
          🔹 Karma's profound concept.
          🔹 The depth of the Gayatri Mantra.
          🔹 Time's significance in the Vedas.
          🔹 Tips for a balanced life.
          "
          />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-916S3MSTVF" />
        <script async id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
  
            gtag('config', 'G-916S3MSTVF');
          `}
        </script>         */}
      </Head>

      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex-1 overflow-auto sm:px-10 pb-4 sm:pb-10" style={{backgroundColor: "#f9f4f0"}}>
          <div className="mx-auto mt-4 sm:mt-12">
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
      {showSubscriptionPopup && (
        <SubscriptionPopup onClose={handleCloseSubscriptionPopup} onSubscribed={handleSubscribed} />
      )}
      {showSubscribedPopup && (
        <SubscribedPopup onClose={handleCloseSubscribedPopup} />
      )}
    </>
  );
}
