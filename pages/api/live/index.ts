import type { NextApiRequest, NextApiResponse } from "next";
import createHandler from "../middleware";
import Live from "../models/live";

const liveRouter = createHandler();

const account = process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT;
const auth = process.env.NEXT_PUBLIC_CLOUDFLARE_TOKEN;

liveRouter.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    fetch(
      `https://api.cloudflare.com/client/v4/accounts/${account}/stream/live_inputs`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify({
          meta: { name: "test stream 1" },
          recording: {
            mode: "automatic",
            timeoutSeconds: 10,
            requireSignedURLs: false,
            allowedOrigins: ["localhost:3000"]
          }
        })
      }
    )
      .then(response => response.json())
      .then(async data => {
        var lives = new Live(data);
        await lives.save();
        console.log(lives);
        res.send(data);
      });
  } catch (e) {
    console.log(e);
  }
});

liveRouter.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  const { liveid, dbid } = req.query;
  console.log(liveid, dbid);
  try {
    fetch(
      `https://api.cloudflare.com/client/v4/accounts/${account}/stream/live_inputs/${liveid}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth}`
        }
      }
    )
      .then(response => response.json())
      .then(async data => {
        console.log(data);
        await Live.findByIdAndDelete({ _id: dbid });
        res.send(data);
      });
  } catch (e) {
    console.log(e);
  }
});

export default liveRouter;
