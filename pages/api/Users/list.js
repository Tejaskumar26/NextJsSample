import db from "../../../models";

export default async function handle(req, res) {
    try {
        const { method } = req;
        if (method !== "GET") {
            res.status(400).json({ message: "only get is supported " })
        }
        const users = await db.users.findAll()
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "something went wrong " })
    }
}