
const jwt = require("jsonwebtoken")

const SECRET_KEY = "5bc6e1b9a045d90e62bfb3989912628b2bf72abe6c6b73fa2c23be8cef25d70e";

function authenticateToken(req, res, next) {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        return res.status(401).send("Access denied: No token provided")

    }
    try {
        const verified = jwt.verify(token, SECRET_KEY)
        req.user = verified;
        next()
    } catch (e) {
        res.status(400).send("Invalid Token")
    }
}

function authorizeRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).send("Access Denied: Insufficient Permissions")
        }
        next();
    }
}

module.exports = { authenticateToken, authorizeRole }