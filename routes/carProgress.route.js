import express from "express";
import { getCarProgress, markAsCompleted, markAsInCompleted, updateLectureProgress } from "../controllers/carProgress.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router()

router.route("/:carId").get(isAuthenticated, getCarProgress);
router.route("/:carId/lecture/:lectureId/view").post(isAuthenticated, updateLectureProgress);
router.route("/:carId/complete").post(isAuthenticated, markAsCompleted);
router.route("/:carId/incomplete").post(isAuthenticated, markAsInCompleted);

export default router;