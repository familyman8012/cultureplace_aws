import createHandler from "../middleware";
import Notice from "../models/notice";
import type { NextApiRequest, NextApiResponse } from "next";

const noticeRouter = createHandler();

noticeRouter.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { _id } = req.query;
    const notices = await Notice.find({ _id });
    return res.send(notices);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

noticeRouter.put(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { _id } = req.query;
    const notices = await Notice.findByIdAndUpdate(_id, req.body, {
      new: true
    });
    return res.send(notices);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

noticeRouter.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { _id } = req.query;
    const notices = await Notice.findByIdAndDelete(_id);
    return res.send(notices);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default noticeRouter;
