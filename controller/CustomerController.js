const Customer = require('../model/Customer')
const findAll = async (requestAnimationFrame, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (e) {
        res.json(e)
    }
}
module.exports = {
    findAll
}