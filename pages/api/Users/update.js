import db from "../../../models";

export default async function update(req, res) {
    try {
        const { method } = req;
        if (method !== "POST") {
            res.status(400).json({ message: "only post method is supported " })
        }
        const { user_id } = req.body
        const users = await db.users.findOne({
            where: { id: user_id }
        })
        if (users) {
            await users.update({ firstName: "tejas" })
            res.status(200).json(users)
        } else {
            res.status(400).json({ message: "user not found " })
        }

    } catch (error) {
        res.status(400).json({ message: "something went wrong " })
    }
}