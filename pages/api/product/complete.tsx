import type { NextApiRequest, NextApiResponse } from "next";
import createHandler from "../middleware";
import Complete from "../models/complete";

const completeRouter = createHandler();

// get
completeRouter.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, productId } = req.query;
  try {
    const list = await Complete.find({
      userId,
      productId
    });
    list && res.json(list);
  } catch (err) {
    console.log(JSON.stringify(err));
    res.status(500).send(JSON.stringify(err));
  }
});

// save
completeRouter.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, productId, lessonId } = req.body;
  try {
    const existing = await Complete.findOne({
      userId,
      productId
    }).exec();

    if (existing) {
      const updated = await Complete.findOneAndUpdate(
        {
          userId,
          productId
        },
        {
          $addToSet: { lessonId }
        }
      );
      res.json(updated);
    } else {
      const created = new Complete(req.body);
      await created.save();
      return res.send(created);
    }
  } catch (err) {
    console.log(JSON.stringify(err));
    res.status(500).send(JSON.stringify(err));
  }
});

export default completeRouter;
