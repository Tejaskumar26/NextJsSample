import validateinit from '../lib/validateinit'
import validatemiddleware from '../lib/validatemiddleware'
import { check, validationResult } from 'express-validator'

const verifyOtpRules = validateinit(
    validatemiddleware([
        check('otp').trim().notEmpty().withMessage('otp cant be empty').isNumeric().withMessage('invalid otp'),
        check('otptoken').trim().notEmpty().withMessage('otptoken cant be empty').isUUID().withMessage('invalid otptoken'),
    ], validationResult)
)

export default verifyOtpRules