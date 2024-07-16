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
  const getObjectCommand = new GetObjectCommand({
    Bucket: "myBucketName",
    Key: context.values.get("awsBucketKey"),
  });
  try {
    const data = await s3Client.send(getObjectCommand);
    return data;
  } catch (error) {
    return error;
  }
};
