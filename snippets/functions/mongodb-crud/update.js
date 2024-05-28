exports = async function(changeEvent) {
  // A Database Trigger will always call a function with a changeEvent.
  // Documentation on ChangeEvents: https://www.mongodb.com/docs/manual/reference/change-events

  // Access the _id of the changed document:
  const docId = changeEvent.documentKey._id;

  // Get the MongoDB service you want to use (see "Linked Data Sources" tab)
  const serviceName = "mongodb-atlas";
  const databaseName = "sample_mflix";
  const collection = context.services.get(serviceName).db(databaseName).collection(changeEvent.ns.coll);

  // Get the "FullDocument" present in the Insert/Replace/Update ChangeEvents
  try {
    if (changeEvent.operationType === "update") {
      await collection.updateOne({"_id": docId}, changeEvent.fullDocument);
    }
  } catch(err) {
    console.log("error performing mongodb update: ", err.message);
  }
};
