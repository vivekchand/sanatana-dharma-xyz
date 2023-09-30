import { Message } from "@/types";
import { OpenAIStream } from "@/utils";
import { kv } from "@vercel/kv";

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
    try {
      await kv.set(requestId, messages);
      await kv.get("user_1_session");
      console.log(requestId);
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
