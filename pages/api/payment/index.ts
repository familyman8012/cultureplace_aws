import createHandler from "../middleware";
import Payment from "../models/payment";
import User from "../models/user";
import Product from "../models/product";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = createHandler();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { userid } = req.query;
  if (userid !== "undefined") {
    const result = await Payment.find({ userid });
    return res.status(200).json(result);
  }
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  var payments = new Payment(req.body);
  try {
    const result = await payments.save();
    console.log(result);
    return res.status(200).json({ result });
  } catch (err) {
    res.status(500).send(err);
  }
});

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { _id, userid } = req.body;
    const joinMember = await Product.updateOne(
      { _id },
      { $push: { joinMembr: userid } },
      { upsert: true }
    );

    return res.send(joinMember);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// handler.put(async (req, res) => {
//   console.log("req.body", req.body);
//   const { p_id, username, title, cont } = req.body;
//   console.log("cont cont", cont);
//   const modifyResult = await Post.update(
//     { _id: p_id },
//     {
//       $set: {
//         username,
//         title,
//         cont,
//       },
//     },
//     { upsert: true }
//   );
//   return res.status(200).json(modifyResult);
// });

// handler.delete(async (req, res) => {
//   const { id } = req.query;
//   var deleteResult = await Post.remove({ _id: id });
//   return res.status(200).json(deleteResult);
// });

export default handler;
