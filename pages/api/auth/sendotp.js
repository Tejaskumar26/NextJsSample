import db from '../../../models'
const otp = require('otp-generator')
const { v4: uuidv4 } = require('uuid')
import sendOtpRules from '../../../validators/authValidators/sendotp.validator'

export default async function sendOtp(req, res) {
    const { method } = req;
    if (method !== 'POST') {
        res.status(400).json({ message: 'only post is allowed' })
    }
    await sendOtpRules(req, res)
    try {
        const { email } = req.body
        const user = await db.users.findOne({
            where: {
                email: email
            }
        })
        if (user) {
            const otps = await otp.generate(4, {
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false,
            })
            const otpToken = uuidv4()

            const otprecord = await db.otp.create(
                {
                    otp: otps,
                    otptoken: otpToken,
                    email: user.email
                }
            )

            res.status(200).json({ message: 'otp sent', user: user, otpRecord: otprecord })
        } else {
            res.status(400).json({ message: 'user not found' })
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'something went wrong', errors: error })
    }
}