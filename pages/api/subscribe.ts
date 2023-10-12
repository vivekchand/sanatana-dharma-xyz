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
    const message = `🙏 Om Gam Ganapataye Namaha 🐘

On this auspicious day, let us begin our journey by offering our heartfelt prayers to Lord Ganapati, the remover of obstacles and the embodiment of wisdom. May his divine presence guide us on this path of exploration and discovery. 🙏
    
Let's dive into the ocean of knowledge and wisdom that Sanatana Dharma offers. From the Vedas to the Bhagavad Gita, yoga to meditation, there is much to explore.
    
Remember the power of sacred mantras. One such mantra is "ॐ गं गणपतये नमः" (Om Gam Ganapataye Namaha). Chant it with devotion to seek Lord Ganapati's blessings and overcome challenges.
    
Have questions about dharma, rituals, yoga, or anything related to Sanatana Dharma? Ask SanatanaDharma.xyz chatbot for guidance.
    
Embrace this journey with an open mind. May it bring us closer to our true selves and lead us to a life filled with purpose, peace, and spiritual growth.`;
    
    const formData = new FormData();
    formData.append('From', "whatsapp:+13074486824");
    formData.append('To', "whatsapp:" + email);
    formData.append('Body', message);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`,
      },
      body: formData,
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log("data is:");
      console.log(data);
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
