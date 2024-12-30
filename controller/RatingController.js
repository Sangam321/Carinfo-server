const Rating = require('../model/Rating')
const findAll = async (requestAnimationFrame, res) => {
    try {
        const ratings = await Rating.find();
        res.status(200).json(ratings);
    } catch (e) {
        res.json(e)
    }
}



const save = async (req, res) => {
    try {
        const { name, description } = req.body
        const rating = new Rating({
            name,
            description,
            image: req.file.originalname
        });
        await rating.save();
        res.status(201).json(rating)
    } catch (e) {
        res.json(e)
    }
}

const findById = async (req, res) => {
    try {
        const rating = await Rating.findById(req.params.id);
        res.status(200).json(rating)
    } catch (e) {
        res.json(e)
    }


}
const deleteById = async (req, res) => {
    try {
        const rating = await Rating.findByIdAndDelete(req.params.id);
        res.status(200).json("data Deleted")
    } catch (e) {
        res.json(e)
    }


}
const update = async (req, res) => {
    try {
        const rating = await Rating.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(rating)
    } catch (e) {
        res.json(e)
    }


}
module.exports = {
    findAll,
    save,
    findById,
    deleteById,
    update
}