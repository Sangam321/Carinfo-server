const User = require('../model/User')
const nodemailer = require("nodemailer")
const findAll = async (requestAnimationFrame, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (e) {
        res.json(e)
    }
}

const save = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            protocol: "smtp",
            auth: {
                user: "sangambasnett888@gmail.com",
                pass: "lcde jzsh nskq geys"
            }
        })

        const info = await transporter.sendMail({
            from: "sangambasnett888@gmail.com",
            to: user.email,
            subject: "User Registration",
            html: `
                <h1>
                    Your Registration has been Completed!
                </h1><p> Your user id is ${user.id}</p>
                `


        })





        res.status(201).json({ user, info })
    } catch (e) {
        res.json(e)
    }
}

const findById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user)
    } catch (e) {
        res.json(e)
    }


}
const deleteById = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json("data Deleted")
    } catch (e) {
        res.json(e)
    }


}
const update = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(user)
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