const AWS = require("aws-sdk");
const sharp = require("sharp");

const s3 = new AWS.S3();

exports.handler = async(event, context, callback) => {
    const Bucket = event.Records[0].s3.bucket.name;   //cultureplace
    const Key = decodeURIComponent(event.Records[0].s3.object.key);  // original/123_abc.png
    
    const filename = Key.split("/")[Key.split("/").length - 1];
    const ext = Key.split(".")[Key.split(".").length - 1].toLowerCase();
    const requiredFormat = ext === "jpg" ? "jpeg" : ext;
    
    try {
        const s3Object = await s3.getObject({ Bucket, Key }).promise();

      //card resized
      const cardResizedImage = await sharp(s3Object.Body)
        .resize(510, 340, { fit: "cover" })
        .toFormat(requiredFormat)
        .toBuffer();
      
        await s3
          .putObject({
            Bucket,
            Key: `card/${filename}`,
            Body: cardResizedImage,
          })
          .promise();
        return callback(null, `card/${filename}`);
    } catch (error) {
        console.error(error)
        return callback(error)
    }
        

}