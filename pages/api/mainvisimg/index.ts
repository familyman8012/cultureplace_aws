import createHandler from "../middleware";
import Mainvisimg from "../models/mainvisimg";
import type { NextApiRequest, NextApiResponse } from "next";

const mainvisimgRouter = createHandler();

mainvisimgRouter.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const mainvisimgs = new Mainvisimg(req.body);
    await mainvisimgs.save();
    return res.send(mainvisimgs);
  } catch (err) {
    res.status(500).send(err);
  }
});

mainvisimgRouter.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const mainvisimgs = await Mainvisimg.find({});
    return res.send(mainvisimgs);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default mainvisimgRouter;
