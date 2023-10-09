import { Message } from "@/types";
import { OpenAIStream } from "@/utils";
import { kv } from "@vercel/kv";
// import cron from "node-cron";

// const job = cron.schedule('* * * * *', async () => {
//   try {
//     const response = await fetch("https://sanatanadharma.xyz/api/chat?cron_test=yes"); // Replace with your API endpoint
//     if (response.ok) {
//       const data = await response.json();
//       console.log("Data fetched:", data);
//     } else {
//       console.error("Failed to fetch data");
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// });

// job.start();

export const config = {
  runtime: "edge"
};

const handler = async (req: Request): Promise<Response> => {
  try {
    // Parse the request body to get the messages and requestId
    const requestBody = await req.json();
    const { messages, requestId } = requestBody;

    // const { messages } = (await req.json()) as {
    //   messages: Message[];
    // };

    const charLimit = 12000;
    let charCount = 0;
    let messagesToSend = [];

    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      if (charCount + message.content.length > charLimit) {
        break;
      }
      charCount += message.content.length;
      messagesToSend.push(message);
    }
    messagesToSend.push({
      role: "assistant",
      content: "please don't reply about topics related coding, programming or common questions people use ChatGPT for"
    });
    try {
      await kv.set(requestId, messages);
      console.log(requestId);
      console.log(messages[messages.length-1]);
      // Handle the successful response here
    } catch (error) {
      console.error("Error during PUT request:", error);
      // Handle the error as needed
    }
    const stream = await OpenAIStream(messagesToSend);

    return new Response(stream);
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
};

export default handler;
