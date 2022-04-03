import type { NextApiRequest, NextApiResponse } from "next";
import createHandler from "../middleware";
import User from "../models/user";
import AWS from "aws-sdk";

const awsConfig = {
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION
};
const SES = new AWS.SES(awsConfig);

const handler = createHandler();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const params = {
      Destination: {
        /* required */
        ToAddresses: [
          "familyman801205@gmail.com"
          /* more items */
        ]
      },
      Message: {
        /* required */
        Body: {
          /* required */
          Html: {
            Charset: "UTF-8",
            Data: `
              <html>
                <h1>Reset password</h1>
                <p>User this code to reset your password</p>
                <h2 style="color:red;">test</h2>
                <i>edemy.com</i>
              </html>
            `
          }
        },
        Subject: {
          Charset: "UTF-8",
          Data: "Reset Password"
        }
      },
      Source: String(process.env.EMAIL_FROM) /* required */,
      ReplyToAddresses: [
        String(process.env.EMAIL_FROM)
        /* more items */
      ]
    };
    const emailSent = SES.sendEmail(params).promise();
    emailSent
      .then(data => {
        console.log(data);
        res.json({ ok: true });
      })
      .catch(err => {
        console.log(err);
      });
  } catch (err) {
    console.log(JSON.stringify(err));
    //res.status(500).send(JSON.stringify(err));
  }
});

export default handler;
