import createHandler from "../middleware";
import Product from "../models/product";

const favoriteRouter = createHandler();

favoriteRouter.post(async (req, res) => {
  try {
    const { _id, favorite, userid } = req.body;
    const favorited = await Product.updateOne(
      { _id },
      favorite === true
        ? { $pull: { favoriteduser: userid } }
        : { $push: { favoriteduser: userid } },
      { upsert: true }
    );

    return res.send(favorited);
  } catch {
    console.log(err);
    res.status(500).send(err);
  }
});

export default favoriteRouter;
