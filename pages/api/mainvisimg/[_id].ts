import createHandler from "../middleware";
import Mainvisimg from "../models/mainvisimg";
import type { NextApiRequest, NextApiResponse } from "next";

const mainvisimgRouter = createHandler();

mainvisimgRouter.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { _id } = req.query;
    const mainvisimgs = await Mainvisimg.findByIdAndDelete(_id);
    return res.send(mainvisimgs);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default mainvisimgRouter;
