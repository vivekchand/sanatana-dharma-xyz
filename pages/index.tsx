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

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (message: Message) => {
    let updatedMessages = [...messages, message];
    let jsonMessages;
    setMessages(updatedMessages);
    setLoading(true);
    if(window.location.href.includes('test')) {
      jsonMessages = JSON.stringify({
        messages: [...messages, message, {
          role: "system",
          content: `Restrict the topic only to Vedas: Discover the ancient scriptures that form the foundation of Hindu philosophy.
          Upanishads: Explore the profound teachings found within the Upanishads.
          Bhagavad Gita: Learn about the epic conversation between Lord Krishna and Arjuna.
          Manusmriti: Understand the principles of dharma as outlined in this ancient text.
          Puranas: Dive into the captivating stories and mythologies of Hinduism.
          Science in Vedas: Uncover the scientific knowledge embedded in the Vedas.
          Yoga and Meditation: Explore the practices of physical and mental well-being.
          Dharma and Karma: Gain insights into the concepts of duty and karma.
          Deities and Worship: Discover the diverse Hindu deities and their significance.
          Temples and Pilgrimage: Learn about sacred places and their cultural importance.
          Ayurveda: Explore the holistic system of natural healing.
          Philosophical Schools: Delve into the various schools of Hindu philosophy.
          Rituals and Festivals: Understand the customs and celebrations of Hinduism.
          History and Evolution: Trace the historical journey of Sanatana Dharma.
          Other Texts: Find information on texts like the Ramayana, Mahabharata, and more.
          Modern Interpretations: Learn how Hinduism is practiced and adapted in the modern world.
          `
        }]
      });
    } else {
      jsonMessages = JSON.stringify({
        messages: updatedMessages
      });
    }

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: jsonMessages
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
    </>
  );
}
