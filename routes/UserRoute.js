const express = require("express")
const router = express.Router();
const { findAll, save, findById, deleteById, update } = require("../controller/UserController");
const UserValidation = require("../validation/UserValidation");


router.get("/", findAll);
router.post("/", UserValidation, save);
router.get("/:id", findById);
router.delete("/:id", deleteById)
router.put("/:id", update)


module.exports = router;
