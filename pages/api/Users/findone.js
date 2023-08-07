import db from "../../../models";

export default async function find(req, res) {
    try {
        const { method } = req;
        if (method !== "GET") {
            res.status(400).json({ message: "only get is supported " })
        }
        const users = await db.users.findOne({
            where: { firstName: 'Tejaskumar' }
        })
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({ message: "something went wrong " })
    }
}