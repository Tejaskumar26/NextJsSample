import db from "../../../models";
import verifyOtpRules from "../../../validators/authValidators/verifyotp.validator";
const jwt = require('jsonwebtoken')

export default async function verify(req, res) {
    const { method } = req;
    if (method !== 'POST') {
        res.status(400).json({ message: "only post method is allowed" })
    }
    await verifyOtpRules(req, res)
    try {
        const { otp, otptoken } = req.body
        const verified = await db.otp.findOne({ where: { otptoken: otptoken } })
        if (verified) {
            if (verified.otp == otp) {
                const user = await db.users.findOne({ where: { email: verified.email } })
                if (user) {
                    const accessToken = jwt.sign(
                        {
                            id: user.id,
                            email: user.email,
                        },
                        process.env.JWT_SECRET,
                        { expiresIn: '72h' },
                    )
                    res.status(200).json({ message: "success", accessToken: accessToken, user: user })
                } else {
                    res.status(400).json({ message: "user not found" })
                }

            } else {
                res.status(400).json({ message: "invalid otp" })
            }
        } else {
            res.status(400).json({ message: "invalid otp token" })
        }

    } catch (error) {
        res.status(400).json({ message: "something went wrong", errors: error })
    }
}