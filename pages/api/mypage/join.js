import createHandler from "../middleware";
import Product from "../models/product";

const joinRouter = createHandler();

joinRouter.get(async (req, res) => {
  const { userid } = req.query;
  if (userid !== "undefined") {
    const result = await Product.find({ joinMembr: userid });
    return res.status(200).json(result);
  }
});

export default joinRouter;
