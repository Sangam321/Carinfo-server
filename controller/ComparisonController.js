const Comparison = require('../model/Comparison')
const findAll = async (requestAnimationFrame, res) => {
    try {
        const comparisons = await Comparison.find();
        res.status(200).json(comparisons);
    } catch (e) {
        res.json(e)
    }
}

const save = async (req, res) => {
    try {
        const comparison = new Comparison(req.body);
        await comparison.save();
        res.status(201).json(comparison)
    } catch (e) {
        res.json(e)
    }
}


module.exports = {
    findAll,
    save,
}