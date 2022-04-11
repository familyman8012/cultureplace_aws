import createHandler from "../middleware";
import Product from "../models/product";
import type { NextApiRequest, NextApiResponse } from "next";

const joinRouter = createHandler();

joinRouter.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { userid } = req.query;
  try {
    if (userid !== "undefined") {
      const result = await Product.find({ joinMembr: userid });
      return res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

export default joinRouter;
