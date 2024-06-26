exports = async function () {
  const { SESv2Client, SendEmailCommand } = require("@aws-sdk/client-sesv2");
  const sesv2Client = new SESv2Client({
    credentials: {
      accessKeyId: context.values.get("awsAccessKeyID"),
      secretAccessKey: context.values.get("awsSecretAccessKey"),
    },
    region: "us-east-1",
    maxAttempts: 5,
  });

  // see https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/sesv2/ for more detail
  const sendEmailCommand = new SendEmailCommand({
    FromEmailAddress: "from.email@youremail.com",
    Destination: {
      ToAddresses: ["to.email@toemail.com"],
    },
    Content: {
      Simple: {
        Subject: {
          Data: "HeLLO SES",
        },
        Body: {
          Text: {
            Data: "This is a simple mail",
          },
        },
      },
    },
  });

  try {
    const data = await sesv2Client.send(sendEmailCommand);
    return data;
  } catch (error) {
    return error;
  }
};
