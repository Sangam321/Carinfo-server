const Car = require('../model/Car')
const findAll = async (requestAnimationFrame, res) => {
    try {
        const cars = await Car.find();
        res.status(200).json(cars);
    } catch (e) {
        res.json(e)
    }
}

const save = async (req, res) => {
    try {
        const car = new Car(req.body);
        await car.save();
        res.status(201).json(car)
    } catch (e) {
        res.json(e)
    }
}

const findById = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        res.status(200).json(car)
    } catch (e) {
        res.json(e)
    }


}
const deleteById = async (req, res) => {
    try {
        const car = await Car.findByIdAndDelete(req.params.id);
        res.status(200).json("data Deleted")
    } catch (e) {
        res.json(e)
    }


}
const update = async (req, res) => {
    try {
        const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(car)
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