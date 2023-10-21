
const handler = async (req, res) => {
    console.log("req");
    console.log(req.query.email);
    const email = req.query.email;

    const unsubscribeQuery = sql`
    DELETE FROM subscriber
    WHERE email = ${email}
    RETURNING *;`;
    const {rows} = await unsubscribeQuery;
    console.log(rows);
    return res.status(200).send("Unsubscribed!");
}

export default handler;
