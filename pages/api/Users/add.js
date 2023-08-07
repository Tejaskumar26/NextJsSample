import isUserAuth from "../../../middlewares/isUserAuth";
import db from "../../../models";

async function create(req, res) {
    const { method } = req;
    if (method !== "POST") {
        res.status(400).json({ message: "only post method is allowed" })
    }
    try {
        const { firstName, lastName, email } = req.body;

        const user = await db.users.create(
            {
                firstName: firstName,
                lastName: lastName,
                email: email
            }
        )
        res.status(200).json(user)

    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "something went wrong" })
    }
}

export default isUserAuth(create)