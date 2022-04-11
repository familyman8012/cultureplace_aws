import type { NextApiRequest, NextApiResponse } from "next";
import createHandler from "../middleware";
import Product from "../models/product";

const productRouter = createHandler();

// get
productRouter.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { _id } = req.query;

    const products = await Product.find({ _id });

    return res.send(products);
  } catch (err) {
    console.log(JSON.stringify(err));
    res.status(500).send(JSON.stringify(err));
  }
});

// 추가.
productRouter.patch(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { _id } = req.query;
    const { title, content, mediaId, filename } = req.body.lessons;
    W;
    const products = await Product.updateOne(
      { _id },
      { $push: { lessons: { title, content, mediaId, filename } } },
      { upsert: true }
    );
    return res.send(products);
  } catch (err) {
    console.log(JSON.stringify(err));
    res.status(500).send(JSON.stringify(err));
  }
});

export default productRouter;
