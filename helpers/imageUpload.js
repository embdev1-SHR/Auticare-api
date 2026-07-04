const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  region: process.env.AWS_S3_REGION,
});

exports.upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + file.originalname.slice(((file.originalname.lastIndexOf(".") - 2) >>> 0) + 2));
    },
  }),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
});

// Upload a base64 data-URL image (e.g. a scenario screenshot) to S3 and
// return its public URL.
exports.uploadBase64 = (dataUrl, keyPrefix) =>
  new Promise((resolve, reject) => {
    const m = /^data:(image\/[\w.+-]+);base64,(.+)$/.exec(dataUrl || "");
    if (!m) return reject(new Error("Invalid image data"));
    const contentType = m[1];
    const buffer = Buffer.from(m[2], "base64");
    const ext = (contentType.split("/")[1] || "jpg").replace(/[^\w]/g, "");
    const key = `blueroom/${keyPrefix}-${Date.now()}.${ext}`;
    s3.putObject(
      {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: contentType,
      },
      (err) => {
        if (err) return reject(err);
        const url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${key}`;
        resolve(url);
      }
    );
  });
