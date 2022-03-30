import createHandler from "../middleware";
import Mainvisimg from "../models/mainvisimg";

const mainvisimgRouter = createHandler();

mainvisimgRouter.delete(async (req, res) => {
  try {
    const { _id } = req.query;
    const mainvisimgs = await Mainvisimg.findByIdAndDelete(_id);
    return res.send(mainvisimgs);
  } catch {
    res.status(500).send(err);
  }
});

export default mainvisimgRouter;
