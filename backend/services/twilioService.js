// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createMessage() {
  const message = await client.messages.create({
    body: "Hey Adel this Just as a notification that your subscription is about to expire on next day",
    from: "+15677071207",
    to: "+15677071207",
  });
  console.log(message.body);
}

createMessage();