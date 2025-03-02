import express from "express";
import { createCar, createLecture, editCar, editLecture, getCarById, getCarLecture, getCreatorCars, getLectureById, getPublishedCar, removeLecture, searchCar, togglePublishCar } from "../controllers/car.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../utils/multer.js";
const router = express.Router();

router.route("/").post(isAuthenticated, createCar);
router.route("/search").get(isAuthenticated, searchCar);
router.route("/published-cars").get(getPublishedCar);
router.route("/").get(isAuthenticated, getCreatorCars);
router.route("/:carId").put(isAuthenticated, upload.single("carThumbnail"), editCar);
router.route("/:carId").get(isAuthenticated, getCarById);
router.route("/:carId/lecture").post(isAuthenticated, createLecture);
router.route("/:carId/lecture").get(isAuthenticated, getCarLecture);
router.route("/:carId/lecture/:lectureId").post(isAuthenticated, editLecture);
router.route("/lecture/:lectureId").delete(isAuthenticated, removeLecture);
router.route("/lecture/:lectureId").get(isAuthenticated, getLectureById);
router.route("/:carId").patch(isAuthenticated, togglePublishCar);


export default router;