import { OpenAIStream } from "@/utils";
import { kv } from "@vercel/kv";
import { Mutex } from "async-mutex";
import twilio from "twilio";
import { sql } from "@vercel/postgres";

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
    const message = `Namaste 🙏 Welcome to the sacred journey with SanatanaDharma.xyz. You're now subscribed to receive one verse a day from the Bhagavad Gita, Vedas, Upanishads. Let the transformation begin!`;
    const template = "namaste_first_message";
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

      const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
      let insertQuery;
      console.log("test 4");

      if(isEmail) {
        console.log("test 5");
        insertQuery = sql`
        INSERT INTO subscriber (email, lastSentMessage, lastSentTemplate)
        VALUES (${email}, ${message}, ${template})
        RETURNING id;
      `;
      } else {
        console.log("test 6");
        insertQuery = sql`
        INSERT INTO subscriber (phoneNumber, lastSentMessage, lastSentTemplate)
        VALUES (${email}, ${message}, ${template})
        RETURNING id;
      `;
      }
      console.log("test 7");
      const { rows } = await insertQuery;
      console.log("test 8");
      const insertedSubscriberId = rows[0].id;
      console.log("test 9");
      console.log("subscriber id:"+ insertedSubscriberId);
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
