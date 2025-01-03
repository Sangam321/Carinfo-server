const joi = require("joi");
const { schema } = require("../model/Comparison");



const userSchema = joi.object({
    full_name: joi.string().required(),
    email: joi.string().required().email(),
})


function UserValidation(req, res, next) {
    const { full_name, email } = req.body;
    const { error } = userSchema.validate({ full_name, email })
    if (error) {
        return res.json(error)
    }
    next()
}

module.exports = UserValidation;