exports = async function (error, changeEvent) {
  // This sample function will log additional details if the error is not
  // a DOCUMENT_TOO_LARGE error
  if (error.code === "DOCUMENT_TOO_LARGE") {
    console.log("Document too large error");

    // Comment out the line below in order to skip this event and not suspend the Trigger
    throw new Error(`Encountered error: ${error.code}`);
  }

  console.log("Error sending event to EventBridge");
  console.log(`DB: ${changeEvent.ns.db}`);
  console.log(`Collection: ${changeEvent.ns.coll}`);
  console.log(`Operation type: ${changeEvent.operationType}`);

  // Throw an error in your function to suspend the trigger and stop processing additional events
  throw new Error(`Encountered error: ${error.message}`);
};
