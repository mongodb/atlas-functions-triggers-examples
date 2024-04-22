exports = async function () {
  var accountSid = context.values.get("TwilioAccountSID");
  var authToken = context.values.get("TwilioAuthToken");

  const client = require("twilio")(accountSid, authToken);

  const messages = await client.messages.create({
    body: "hello world",
    from: "+15005550006",
    to: "+14242424242",
  });
  return messages.accountSid;
};
