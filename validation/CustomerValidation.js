const joi = require("joi");
const { schema } = require("../model/Comparison");



const customerSchema = joi.object({
    full_name: joi.string().required(),
    email: joi.string().required().email(),
})


function CustomerValidation(req, res, next) {
    const { full_name, email } = req.body;
    const { error } = customerSchema.validate({ full_name, email })
    if (error) {
        return res.json(error)
    }
    next()
}

module.exports = CustomerValidation;