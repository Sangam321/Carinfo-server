
import { Car } from "../models/car.model.js";
import { Lecture } from "../models/Favourite.model.js";
import { deleteMediaFromCloudinary, deleteVideoFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const createCar = async (req, res) => {
    try {
        const { carTitle, category } = req.body;
        if (!carTitle || !category) {
            return res.status(400).json({
                message: "Car title and category is required."
            })
        }

        const car = await Car.create({
            carTitle,
            category,
            creator: req.id
        });

        return res.status(201).json({
            car,
            message: "Car created."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to create car"
        })
    }
}

export const searchCar = async (req, res) => {
    try {
        const { query = "", categories = [], sortByPrice = "" } = req.query;
        console.log(categories);

        // create search query
        const searchCriteria = {
            isPublished: true,
            $or: [
                { carTitle: { $regex: query, $options: "i" } },
                { subTitle: { $regex: query, $options: "i" } },
                { category: { $regex: query, $options: "i" } },
            ]
        }

        // if categories selected
        if (categories.length > 0) {
            searchCriteria.category = { $in: categories };
        }

        // define sorting order
        const sortOptions = {};
        if (sortByPrice === "low") {
            sortOptions.carPrice = 1;//sort by price in ascending
        } else if (sortByPrice === "high") {
            sortOptions.carPrice = -1; // descending
        }

        let cars = await Car.find(searchCriteria).populate({ path: "creator", select: "name photoUrl" }).sort(sortOptions);

        return res.status(200).json({
            success: true,
            cars: cars || []
        });

    } catch (error) {
        console.log(error);

    }
}

export const getPublishedCar = async (_, res) => {
    try {
        const cars = await Car.find({ isPublished: true }).populate({ path: "creator", select: "name photoUrl" });
        if (!cars) {
            return res.status(404).json({
                message: "Car not found"
            })
        }
        return res.status(200).json({
            cars,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to get published cars"
        })
    }
}
export const getCreatorCars = async (req, res) => {
    try {
        const userId = req.id;
        const cars = await Car.find({ creator: userId });
        if (!cars) {
            return res.status(404).json({
                cars: [],
                message: "Car not found"
            })
        };
        return res.status(200).json({
            cars,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to create car"
        })
    }
}
export const editCar = async (req, res) => {
    try {
        const carId = req.params.carId;
        const { carTitle, subTitle, description, category, carLevel, carPrice } = req.body;
        const thumbnail = req.file;

        let car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({
                message: "Car not found!"
            })
        }
        let carThumbnail;
        if (thumbnail) {
            if (car.carThumbnail) {
                const publicId = car.carThumbnail.split("/").pop().split(".")[0];
                await deleteMediaFromCloudinary(publicId); // delete old image
            }
            // upload a thumbnail on clourdinary
            carThumbnail = await uploadMedia(thumbnail.path);
        }


        const updateData = { carTitle, subTitle, description, category, carLevel, carPrice, carThumbnail: carThumbnail?.secure_url };

        car = await Car.findByIdAndUpdate(carId, updateData, { new: true });

        return res.status(200).json({
            car,
            message: "Car updated successfully."
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to create car"
        })
    }
}
export const getCarById = async (req, res) => {
    try {
        const { carId } = req.params;

        const car = await Car.findById(carId);

        if (!car) {
            return res.status(404).json({
                message: "Car not found!"
            })
        }
        return res.status(200).json({
            car
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to get car by id"
        })
    }
}

export const createLecture = async (req, res) => {
    try {
        const { lectureTitle } = req.body;
        const { carId } = req.params;

        if (!lectureTitle || !carId) {
            return res.status(400).json({
                message: "Lecture title is required"
            })
        };

        // create lecture
        const lecture = await Lecture.create({ lectureTitle });

        const car = await Car.findById(carId);
        if (car) {
            car.lectures.push(lecture._id);
            await car.save();
        }

        return res.status(201).json({
            lecture,
            message: "Lecture created successfully."
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to create lecture"
        })
    }
}
export const getCarLecture = async (req, res) => {
    try {
        const { carId } = req.params;
        const car = await Car.findById(carId).populate("lectures");
        if (!car) {
            return res.status(404).json({
                message: "Car not found"
            })
        }
        return res.status(200).json({
            lectures: car.lectures
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to get lectures"
        })
    }
}
export const editLecture = async (req, res) => {
    try {
        const { lectureTitle, videoInfo, isPreviewFree } = req.body;

        const { carId, lectureId } = req.params;
        const lecture = await Lecture.findById(lectureId);
        if (!lecture) {
            return res.status(404).json({
                message: "Lecture not found!"
            })
        }

        // update lecture
        if (lectureTitle) lecture.lectureTitle = lectureTitle;
        if (videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl;
        if (videoInfo?.publicId) lecture.publicId = videoInfo.publicId;
        lecture.isPreviewFree = isPreviewFree;

        await lecture.save();

        // Ensure the car still has the lecture id if it was not aleardy added;
        const car = await Car.findById(carId);
        if (car && !car.lectures.includes(lecture._id)) {
            car.lectures.push(lecture._id);
            await car.save();
        };
        return res.status(200).json({
            lecture,
            message: "Lecture updated successfully."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to edit lectures"
        })
    }
}
export const removeLecture = async (req, res) => {
    try {
        const { lectureId } = req.params;
        const lecture = await Lecture.findByIdAndDelete(lectureId);
        if (!lecture) {
            return res.status(404).json({
                message: "Lecture not found!"
            });
        }
        // delete the lecture from couldinary as well
        if (lecture.publicId) {
            await deleteVideoFromCloudinary(lecture.publicId);
        }

        // Remove the lecture reference from the associated car
        await Car.updateOne(
            { lectures: lectureId }, // find the car that contains the lecture
            { $pull: { lectures: lectureId } } // Remove the lectures id from the lectures array
        );

        return res.status(200).json({
            message: "Lecture removed successfully."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to remove lecture"
        })
    }
}
export const getLectureById = async (req, res) => {
    try {
        const { lectureId } = req.params;
        const lecture = await Lecture.findById(lectureId);
        if (!lecture) {
            return res.status(404).json({
                message: "Lecture not found!"
            });
        }
        return res.status(200).json({
            lecture
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to get lecture by id"
        })
    }
}


// publich unpublish car logic

export const togglePublishCar = async (req, res) => {
    try {
        const { carId } = req.params;
        const { publish } = req.query; // true, false
        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({
                message: "car not found!"
            });
        }
        // publish status based on the query paramter
        car.isPublished = publish === "true";
        await car.save();

        const statusMessage = car.isPublished ? "Published" : "Unpublished";
        return res.status(200).json({
            message: `Car is ${statusMessage}`
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to update status"
        })
    }
}
