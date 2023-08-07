import db from "../../../models";

export default async function handler(req, res) {
    try {
        const { method } = req;
        if (method !== "DELETE") {
            res.status(400).json({ message: "only DELETE method is supported " })
        }
        const { user_id } = req.body
        const users = await db.users.destroy({
            where: { id: user_id }
        })
        if (users) {
            res.status(200).json(users)
        } else {
            res.status(400).json({ message: "user not found " })
        }

    } catch (error) {
        res.status(400).json({ message: "something went wrong " })
    }
}