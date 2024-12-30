const express = require("express")
const router = express.Router();
const { findAll, save, findById, deleteById, update } = require("../controller/FavouritesController");
const { authenticateToken } = require("../security/Auth")
const multer = require("multer")

const upload = multer({ storage })

router.get("/", findAll);
router.post("/", authenticateToken, upload.single('file'), save);
router.get("/:id", authenticateToken, findById);
router.delete("/:id", authenticateToken, deleteById)
router.put("/:id", authenticateToken, update)


module.exports = router;
