exports = async function () {
  const {
    KinesisClient,
    DescribeStreamCommand,
  } = require("@aws-sdk/client-kinesis");
  const kinesisClient = new KinesisClient({
    credentials: {
      accessKeyId: context.values.get("awsAccessKeyID"),
      secretAccessKey: context.values.get("awsSecretAccessKey"),
    },
    region: "us-east-1",
    maxAttempts: 5,
  });

  // see https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/kinesis/ for more commands
  const describeStreamCommand = new DescribeStreamCommand({
    StreamName: "myStreamName",
  });

  try {
    const data = await kinesisClient.send(describeStreamCommand);
    return data.StreamDescription.StreamName;
  } catch (error) {
    return error;
  }
};
