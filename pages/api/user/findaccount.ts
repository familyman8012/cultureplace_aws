import type { NextApiRequest, NextApiResponse } from "next";
import createHandler from "../middleware";
import User from "../models/user";
import { nanoid } from "nanoid";
import crypto from "crypto";
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
    const users = await User.find(req.query, {
      email: true
    });
    return res.send(users);
  } catch (err) {
    console.log(JSON.stringify(err));
    res.status(500).send(JSON.stringify(err));
  }
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email } = req.body;
    // console.log("email", email);
    const shortCode = nanoid(6).toUpperCase();
    const user = await User.findOneAndUpdate(
      { email },
      { passwordResetCode: shortCode }
    );
    if (!user)
      return res
        .status(400)
        .send("사용자를 찾지 못했습니다. 이메일을 다시 확인해보세요.");

    const params = {
      Destination: {
        /* required */
        ToAddresses: [email]
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
                    <h2 style="color:red;">${shortCode}</h2>
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
        res.json({ ok: true });
      })
      .catch(err => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
});

handler.patch(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let { email, code, newPassword } = req.body;

    crypto.randomBytes(64, (err, buf) => {
      crypto.pbkdf2(
        newPassword,
        buf.toString("base64"),
        100000,
        64,
        "sha512",
        (err, key) => {
          newPassword = key.toString("base64");
          const salt = buf.toString("base64");
          User.findOneAndUpdate(
            {
              email,
              passwordResetCode: code
            },
            {
              userpwd: newPassword,
              salt,
              passwordResetCode: ""
            }
          )
            .then(user => {
              if (!user)
                return res
                  .status(400)
                  .send(
                    "사용자를 찾지 못했습니다. 이메일, CODE, 비밀번호를 올바르게 입력해주세요"
                  );
              return res.json({ ok: true });
            })
            .catch(error => {
              console.log(error);
              return res.status(400).send("Error! Try again.");
            });
        }
      );
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error! Try again.");
  }
});

export default handler;
