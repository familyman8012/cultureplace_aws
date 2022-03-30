import type { NextApiRequest, NextApiResponse } from "next";
import createHandler from "../middleware";
import Product from "../models/product";

const productRouter = createHandler();

productRouter.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { isvod, page, limit } = req.query;
  const Numberlimit = Number(limit);

  try {
    const [products, productsCount] = await Promise.all([
      Product.find({ isvod: true, islive: { $ne: false } }, { body: false })
        .sort({ firstmeet: 1 })
        .limit(Numberlimit)
        .skip((Number(page) - 1) * Numberlimit),
      Product.find({}).countDocuments()
    ]);
    return res.send({ products, productsCount });
  } catch (err) {
    console.log(JSON.stringify(err));
    res.status(500).send(JSON.stringify(err));
  }
});

export default productRouter;
function err(err: any) {
  throw new Error("Function not implemented.");
}
