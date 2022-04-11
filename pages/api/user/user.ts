import type { NextApiRequest, NextApiResponse } from "next";
import createHandler from "../middleware";
import User from "../models/user";
import crypto from "crypto";
import { IUser } from "@src/typings/db";

const handler = createHandler();

interface IError {
  code: number;
}

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  crypto.randomBytes(64, (err, buf) => {
    crypto.pbkdf2(
      req.body.userpwd,
      buf.toString("base64"),
      100000,
      64,
      "sha512",
      (err, key) => {
        req.body.userpwd = key.toString("base64");
        req.body.salt = buf.toString("base64");
        var users = new User(req.body);
        users
          .save()
          .then((user: IUser) => {
            return res.status(200).json({ data: users });
          })
          .catch((error: IError) => {
            error.code === 11000
              ? res
                  .status(400)
                  .send(
                    "이미 사용자가 있는 이메일입니다. 메일은 고유해야합니다. 다른 메일을 등록해주세요."
                  )
              : res
                  .status(400)
                  .send(
                    "다시 한번 시도해주세요. 반복해서 이상이 생길 시 카톡으로 알려주세요."
                  );
          });
      }
    );
  });
});

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const users = await User.aggregate([
    {
      $facet: {
        byAgegroup: [{ $sortByCount: "$agegroup" }],
        byGender: [{ $sortByCount: "$gender" }]
      }
    }
  ]);
  res.status(200).send(users[0]);
});

// handler.get(async (req, res) => {
//   if (req.query._id !== "undefined") {
//     const users = await User.find({ _id: req.query._id })
//       .populate("payments")
//       .exec();

//     res.status(200).json(users);
//   }
// });

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  const { _id } = req.query;
  const users = await User.remove({ _id });
  return res.status(200).json(users);
});

handler.patch(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { _id } = req.query;
    const users = await User.findByIdAndUpdate(_id, req.body, {
      new: true
    });
    console.log(users);
    return res.send(users.role);
  } catch (err) {
    console.log(JSON.stringify(err));
    res.status(500).send(JSON.stringify(err));
  }
});

export default handler;
