exports = async function () {
  const {
    S3Client,
    GetObjectCommand,
    PutObjectCommand,
  } = require("@aws-sdk/client-s3");
  const s3Client = new S3Client({
    credentials: {
      accessKeyId: context.values.get("awsAccessKeyID"),
      secretAccessKey: context.values.get("awsSecretAccessKey"),
    },
    region: "us-east-1",
  });

  // see https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/ for more details
  const putObjectCommand = new PutObjectCommand({
    Bucket: "myBucketName",
    Key: context.values.get("awsBucketKey"),
    Body: Buffer.from("bucket data"),
  });
  try {
    const data = await s3Client.send(putObjectCommand);
    return data !== null && data.ETag !== "";
  } catch (error) {
    return error;
  }
};
