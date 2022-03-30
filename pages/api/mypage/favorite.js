import createHandler from "../middleware";
import Product from "../models/product";

const favoriteRouter = createHandler();

favoriteRouter.get(async (req, res) => {
  const { userid } = req.query;
  if (userid !== "undefined") {
    const result = await Product.find({ favoriteduser: userid });
    return res.status(200).json(result);
  }
});

export default favoriteRouter;
