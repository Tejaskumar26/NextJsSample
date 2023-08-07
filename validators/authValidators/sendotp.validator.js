import validateinit from '../lib/validateinit'
import validatemiddleware from '../lib/validatemiddleware'
import { check, validationResult } from 'express-validator'

const sendOtpRules = validateinit(
    validatemiddleware([
        check('email').trim().notEmpty().withMessage('email cant be empty').isEmail().withMessage('invalid email'),
    ], validationResult)
)

export default sendOtpRules;

