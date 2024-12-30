const Favourites = require('../model/Favourites')
const findAll = async (requestAnimationFrame, res) => {
    try {
        const favourites = await Favourites.find();
        res.status(200).json(favourites);
    } catch (e) {
        res.json(e)
    }
}



const save = async (req, res) => {
    try {
        const { name, description } = req.body
        const favourites = new Favourites({
            name,
            description,
            image: req.file.originalname
        });
        await favourites.save();
        res.status(201).json(favourites)
    } catch (e) {
        res.json(e)
    }
}

const findById = async (req, res) => {
    try {
        const favourites = await Favourites.findById(req.params.id);
        res.status(200).json(favourites)
    } catch (e) {
        res.json(e)
    }


}
const deleteById = async (req, res) => {
    try {
        const favourites = await Favourites.findByIdAndDelete(req.params.id);
        res.status(200).json("data Deleted")
    } catch (e) {
        res.json(e)
    }


}
const update = async (req, res) => {
    try {
        const favourites = await Favourites.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(favourites)
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