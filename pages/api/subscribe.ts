import { OpenAIStream } from "@/utils";
import { kv } from "@vercel/kv";

export const config = {
  runtime: "edge"
};

const handler = async (req: Request): Promise<Response> => {
  try {
    // Parse the request body to get the messages and requestId
    const requestBody = await req.json();
    const { email } = requestBody;

    return new Response("subscribed!");
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
};

export default handler;
