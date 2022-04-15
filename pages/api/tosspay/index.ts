import type { NextApiRequest, NextApiResponse } from "next";
import createHandler from "../middleware";

const tossRouter = createHandler();

function base64encode(plaintext: string) {
  return Buffer.from(plaintext, "utf8").toString("base64");
}

tossRouter.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { amount, orderId, paymentKey } = req.body;
  try {
    fetch(`https://api.tosspayments.com/v1/payments/${paymentKey}`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${base64encode(
          `${process.env.TOSS_SECRET_KEY}:`
        )}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount,
        orderId
      })
    })
      .then(response => response.json())
      .then(async data => {
        res.send(data);
      });
  } catch (e) {
    console.log(e);
  }
});

export default tossRouter;
