import { sql } from "@vercel/postgres";

const handler = async (req: Request): Promise<Response> => {
  try {
    // Parse the request body to get the email
    const requestBody = await req.json();
    const { email } = requestBody;
    console.log("test 1");

    const unsubscribeQuery = sql`
      DELETE FROM subscriber
      WHERE email = ${email}
      RETURNING *;`;
    const {rows} = await unsubscribeQuery;
    console.log(rows);
    return new Response("Unsubscribed!");
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
};

export default handler;
