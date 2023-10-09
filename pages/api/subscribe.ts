import { OpenAIStream } from "@/utils";
import { kv } from "@vercel/kv";
import { Mutex } from "async-mutex";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

interface TwilioMessage {
  sid: string;
  // Add other properties as needed
}

const client = require('twilio')(accountSid, authToken);

export const config = {
  runtime: "edge"
};
const emailMutex = new Mutex();

const handler = async (req: Request): Promise<Response> => {
  try {
    // Parse the request body to get the email
    const requestBody = await req.json();
    const { email } = requestBody;

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

    client.messages.create({
      from: 'whatsapp:+13074486824',
      body: 'Hello there!',
      to: 'whatsapp:+31622429582'
    })
    .then((msg: TwilioMessage) => console.log(msg.sid));

    return new Response("Subscribed!");
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
};

export default handler;
