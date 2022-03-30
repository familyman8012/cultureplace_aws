import dayjs from "dayjs";
import { ChangeEventHandler, useCallback, useState } from "react";
import ReactS3Client from "react-aws-s3-typescript";

const useDeleteImg = (
  path = "content"
): [string, (deleteFileLocaition: string) => Promise<void>] => {
  const [data, setData] = useState("");

  const handler = useCallback(
    async deleteFileLocaition => {
      const s3Config = {
        bucketName: "cultureplace",
        dirName: String(path),
        region: "ap-northeast-2",
        accessKeyId: String(process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID),
        secretAccessKey: String(process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY)
      };

      const s3 = new ReactS3Client(s3Config);

      console.log("deleteFileLocaition", deleteFileLocaition);

      const key = deleteFileLocaition.replace(
        "https://cultureplace.s3-ap-northeast-2.amazonaws.com/",
        ""
      );

      console.log(key);

      try {
        const res = await s3.deleteFile(key);
        console.log("res", res);
        // setData(res.message);
      } catch (error) {
        console.log(error);
      }
    },
    [path]
  );
  return [data, handler];
};

export default useDeleteImg;
