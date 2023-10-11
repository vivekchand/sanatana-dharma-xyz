import { OpenAIStream } from "@/utils";
import { kv } from "@vercel/kv";
import { Mutex } from "async-mutex";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

interface TwilioMessage {
  sid: string;
  // Add other properties as needed
}


export const config = {
  runtime: "edge"
};
const emailMutex = new Mutex();

async function sendWhatsappMessage(url:string, email:string) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        'From': "whatsapp:+13074486824",
        'To': "whatsapp:" + email,
        'Body': "🙏 Namaste! I'm Sanatana Dharma Chatbot, your AI assistant for Bhagavad Gita, Vedas, Puranas, Yoga, and healthy living. Discover insights about karma, the Gayatri Mantra, Vedic interpretations, and more.\n\nCurious? Ask questions like:\n🔹 Can you explain the concept of dharma in Sanatana Dharma?\n🔹 Tell me about the importance of meditation in the Vedas\n🔹 What are the key principles of Bhakti Yoga?\n🔹 How can I incorporate Ayurvedic principles into my daily life?",
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("data is:" + data);
      console.log("test 3");
    } else {
      console.error("Fetch request failed with status " + response.status);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}


const handler = async (req: Request): Promise<Response> => {
  try {
    // Parse the request body to get the email
    const requestBody = await req.json();
    const { email } = requestBody;
    console.log("test 1");

    try {
      // Acquire a lock to ensure exclusive access to the emails list
      const release = await emailMutex.acquire();

      try {
        // Get the current list of emails or initialize an empty array
        const emails: string[] = (await kv.get("emails")) || [];

        // Append the new email to the list
        emails.push(email);

        // Store the updated list of emails back in the key-value store
        await kv.set("emails", JSON.stringify(emails));

        console.log(email);
        // Handle the successful response here
      } finally {
        // Release the lock
        release();
      }
    } catch (error) {
      console.error("Error updating emails list:", error);
      // Handle the error as needed
    }

    await sendWhatsappMessage(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, email);

    return new Response("Subscribed!!!");
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
};

export default handler;
