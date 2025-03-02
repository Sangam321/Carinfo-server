import { Car } from "../models/car.model.js";
import { CarProgress } from "../models/carProgress.js";

export const getCarProgress = async (req, res) => {
  try {
    const { carId } = req.params;
    const userId = req.id;

    // step-1 fetch the user car progress
    let carProgress = await CarProgress.findOne({
      carId,
      userId,
    }).populate("carId");

    const carDetails = await Car.findById(carId).populate("lectures");

    if (!carDetails) {
      return res.status(404).json({
        message: "Car not found",
      });
    }

    // Step-2 If no progress found, return car details with an empty progress
    if (!carProgress) {
      return res.status(200).json({
        data: {
          carDetails,
          progress: [],
          completed: false,
        },
      });
    }

    // Step-3 Return the user's car progress along with car details
    return res.status(200).json({
      data: {
        carDetails,
        progress: carProgress.lectureProgress,
        completed: carProgress.completed,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateLectureProgress = async (req, res) => {
  try {
    const { carId, lectureId } = req.params;
    const userId = req.id;

    // fetch or create car progress
    let carProgress = await CarProgress.findOne({ carId, userId });

    if (!carProgress) {
      // If no progress exists, create a new record
      carProgress = new CarProgress({
        userId,
        carId,
        completed: false,
        lectureProgress: [],
      });
    }

    // find the lecture progress in the car progress
    const lectureIndex = carProgress.lectureProgress.findIndex(
      (lecture) => lecture.lectureId === lectureId
    );

    if (lectureIndex !== -1) {
      // if lecture already exists, update its status
      carProgress.lectureProgress[lectureIndex].viewed = true;
    } else {
      // Add new lecture progress
      carProgress.lectureProgress.push({
        lectureId,
        viewed: true,
      });
    }

    // if all lectures are complete
    const lectureProgressLength = carProgress.lectureProgress.filter(
      (lectureProg) => lectureProg.viewed
    ).length;

    const car = await Car.findById(carId);

    if (car.lectures.length === lectureProgressLength)
      carProgress.completed = true;

    await carProgress.save();

    return res.status(200).json({
      message: "Lecture progress updated successfully.",
    });
  } catch (error) {
    console.log(error);
  }
};

export const markAsCompleted = async (req, res) => {
  try {
    const { carId } = req.params;
    const userId = req.id;

    const carProgress = await CarProgress.findOne({ carId, userId });
    if (!carProgress)
      return res.status(404).json({ message: "Car progress not found" });

    carProgress.lectureProgress.map(
      (lectureProgress) => (lectureProgress.viewed = true)
    );
    carProgress.completed = true;
    await carProgress.save();
    return res.status(200).json({ message: "Car marked as completed." });
  } catch (error) {
    console.log(error);
  }
};

export const markAsInCompleted = async (req, res) => {
  try {
    const { carId } = req.params;
    const userId = req.id;

    const carProgress = await CarProgress.findOne({ carId, userId });
    if (!carProgress)
      return res.status(404).json({ message: "Car progress not found" });

    carProgress.lectureProgress.map(
      (lectureProgress) => (lectureProgress.viewed = false)
    );
    carProgress.completed = false;
    await carProgress.save();
    return res.status(200).json({ message: "Car marked as incompleted." });
  } catch (error) {
    console.log(error);
  }
};
