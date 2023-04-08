const FoodCollectors = require("../models/foodCollectors");

const fetchFoodCollectors = async (req, res, next) => {
  try {
    const foodCollectors = await FoodCollectors.find({});
    res.status(200).json({
      code: 200,
      status: "success",
      message: `Displaying Food Collectors`,
      foodCollectors,
    });
  } catch (error) {
    res.status(400).send({
      code: 400,
      status: "fail",
      message: error.message,
    });
  }

  next();
};

module.exports = fetchFoodCollectors;
