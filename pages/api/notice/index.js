import createHandler from "../middleware";
import Notice from "../models/notice";

const noticeRouter = createHandler();

noticeRouter.get(async (req, res) => {
  try {
    const notices = await Notice.find({}).sort({ createdAt: -1 });
    return res.send(notices);
  } catch {
    console.log(err);
    res.status(500).send(err);
  }
});

noticeRouter.post(async (req, res) => {
  try {
    const notices = new Notice(req.body);
    await notices.save();
    return res.send(notices);
  } catch {
    console.log(err);
    res.status(500).send(err);
  }
});

export default noticeRouter;
