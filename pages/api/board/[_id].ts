import { NextApiRequest, NextApiResponse } from "next";
import createHandler from "../middleware";
import Board from "../models/board";
import User from "../models/user";
import mongoose from "mongoose";

const boardRouter = createHandler();

boardRouter.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { _id } = req.query;
    if (!mongoose.Types.ObjectId.isValid(String(_id))) {
      return res.status(400).send({ err: "id형식에 맞지 않습니다." });
    }

    if ((await Board.find({ _id }).countDocuments()) === 0) {
      return res.status(404).send({ err: "잘 못된 경로로 접속하셨습니다." });
    }

    const boards = await Board.findOneAndUpdate(
      { _id },
      { $inc: { readcount: 1 } }
    );
    return res.send(boards);
  } catch (err) {
    console.log(`message : ${err}`);
    res.status(500).send({ err: (err as Error)?.message });
  }
});

boardRouter.patch(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { _id } = req.query;
    const boardsInfo = await Board.findOne({ _id });
    // 댓글일때는, 게시물에서 댓글 갯수를 빼주고,
    if (boardsInfo.title !== "comment") {
      await Board.findOneAndUpdate(
        { _id },
        { $inc: { readcount: -2 } },
        {
          new: true
        }
      );
    }
    const boards = await Board.findByIdAndUpdate(_id, req.body, {
      new: true
    });
    return res.send(boards);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

boardRouter.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { _id } = req.query;
    const boardsInfo = await Board.findOne({ _id });
    // 댓글일때는, 게시물에서 댓글 갯수를 빼주고,
    if (boardsInfo.title === "comment") {
      await Board.findOneAndUpdate(
        { _id: boardsInfo.parentId },
        { $inc: { commentcount: -1 } },
        {
          new: true
        }
      );
    } else {
      // 댓글이 아니고, 게시물이라면 그 게시물의 댓글들을 다 지운다.
      await Board.deleteMany({ parentId: _id });
    }
    const boards = await Board.findByIdAndDelete(_id);
    return res.send(boards);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default boardRouter;
