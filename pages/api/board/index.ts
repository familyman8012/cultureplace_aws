import { NextApiRequest, NextApiResponse } from "next";
import createHandler from "../middleware";
import Board from "../models/board";
import User from "../models/user";
import mongoose from "mongoose";

const boardRouter = createHandler();

boardRouter.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { parentId, page, limit, searchKeyword } = req.query;
  const Numberlimit = Number(limit);

  try {
    if (!searchKeyword) {
      const [noticeboard, board, boardCount] = await Promise.all([
        Board.find({ parentId, noticecheck: true }).sort({ createdAt: -1 }),
        Board.find({ parentId })
          .sort({ createdAt: -1 })
          .limit(Numberlimit)
          .skip((Number(page) - 1) * Numberlimit),
        Board.find({ parentId }).countDocuments()
      ]);
      return res.send({ noticeboard, board, boardCount });
    } else {
      const board = await Board.aggregate([
        {
          $search: {
            index: "boardSearch",
            text: { query: searchKeyword, path: ["title", "nickname"] }
          }
        },
        { $match: { parentId } }
      ]).sort({ createdAt: -1 });
      const boardCount = await board.length;
      return res.send({ board, boardCount });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

boardRouter.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { parentId, title } = req.body;
    const boards = new Board(req.body);
    await boards.save();
    if (title === "comment") {
      await Board.findByIdAndUpdate(
        parentId,
        { $inc: { commentcount: 1 } },
        {
          new: true
        }
      );
    }
    return res.send(boards);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default boardRouter;
