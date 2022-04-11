import createHandler from "../middleware";
import Notice from "../models/notice";
import type { NextApiRequest, NextApiResponse } from "next";

const noticeRouter = createHandler();

noticeRouter.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const notices = await Notice.find({}).sort({ createdAt: -1 });
    return res.send(notices);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

noticeRouter.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const notices = new Notice(req.body);
    await notices.save();
    return res.send(notices);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default noticeRouter;
