import Stripe from "stripe";
import { Car } from "../models/car.model.js";
import { CarPurchase } from "../models/carPurchase.model.js";
import { Lecture } from "../models/Favourite.model.js";
import { User } from "../models/user.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.id;
    const { carId } = req.body;

    const car = await Car.findById(carId);
    if (!car) return res.status(404).json({ message: "Car not found!" });

    // Create a new car purchase record
    const newPurchase = new CarPurchase({
      carId,
      userId,
      amount: car.carPrice,
      status: "pending",
    });

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: car.carTitle,
              images: [car.carThumbnail],
            },
            unit_amount: car.carPrice * 100, // Amount in paise (lowest denomination)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/car-progress/${carId}`, // once payment successful redirect to car progress page
      cancel_url: `http://localhost:5173/car-detail/${carId}`,
      metadata: {
        carId: carId,
        userId: userId,
      },
      shipping_address_collection: {
        allowed_countries: ["IN"], // Optionally restrict allowed countries
      },
    });

    if (!session.url) {
      return res
        .status(400)
        .json({ success: false, message: "Error while creating session" });
    }

    // Save the purchase record
    newPurchase.paymentId = session.id;
    await newPurchase.save();

    return res.status(200).json({
      success: true,
      url: session.url, // Return the Stripe checkout URL
    });
  } catch (error) {
    console.log(error);
  }
};

export const stripeWebhook = async (req, res) => {
  let event;

  try {
    const payloadString = JSON.stringify(req.body, null, 2);
    const secret = process.env.WEBHOOK_ENDPOINT_SECRET;

    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret,
    });

    event = stripe.webhooks.constructEvent(payloadString, header, secret);
  } catch (error) {
    console.error("Webhook error:", error.message);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  // Handle the checkout session completed event
  if (event.type === "checkout.session.completed") {
    console.log("check session complete is called");

    try {
      const session = event.data.object;

      const purchase = await CarPurchase.findOne({
        paymentId: session.id,
      }).populate({ path: "carId" });

      if (!purchase) {
        return res.status(404).json({ message: "Purchase not found" });
      }

      if (session.amount_total) {
        purchase.amount = session.amount_total / 100;
      }
      purchase.status = "completed";

      // Make all lectures visible by setting `isPreviewFree` to true
      if (purchase.carId && purchase.carId.lectures.length > 0) {
        await Lecture.updateMany(
          { _id: { $in: purchase.carId.lectures } },
          { $set: { isPreviewFree: true } }
        );
      }

      await purchase.save();

      // Update user's enrolledCars
      await User.findByIdAndUpdate(
        purchase.userId,
        { $addToSet: { enrolledCars: purchase.carId._id } }, // Add car ID to enrolledCars
        { new: true }
      );

      // Update car to add user ID to enrolledOwners
      await Car.findByIdAndUpdate(
        purchase.carId._id,
        { $addToSet: { enrolledOwners: purchase.userId } }, // Add user ID to enrolledOwners
        { new: true }
      );
    } catch (error) {
      console.error("Error handling event:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  res.status(200).send();
};

export const getCarDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { carId } = req.params;
    const userId = req.id;

    const car = await Car.findById(carId)
      .populate({ path: "creator" })
      .populate({ path: "lectures" });

    const purchased = await CarPurchase.findOne({ userId, carId });
    console.log(purchased);

    if (!car) {
      return res.status(404).json({ message: "Car not found!" });
    }

    return res.status(200).json({
      car,
      purchased: !!purchased, // true if purchased, false otherwise
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPurchasedCar = async (_, res) => {
  try {
    const purchasedCar = await CarPurchase.find({
      status: "completed",
    }).populate("carId");
    if (!purchasedCar) {
      return res.status(404).json({
        purchasedCar: [],
      });
    }
    return res.status(200).json({
      purchasedCar,
    });
  } catch (error) {
    console.log(error);
  }
};
