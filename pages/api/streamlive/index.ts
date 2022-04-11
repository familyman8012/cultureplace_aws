import createHandler from "../middleware";
import Live from "../models/live";
import type { NextApiRequest, NextApiResponse } from "next";

const liveRouter = createHandler();

liveRouter.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const lives = await Live.find({}).sort({ createdAt: -1 });
    return res.send(lives);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default liveRouter;
