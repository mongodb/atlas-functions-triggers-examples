exports = async function (changeEvent) {
  // A Database Trigger will always call a function with a changeEvent.
  // Documentation on ChangeEvents: https://www.mongodb.com/docs/manual/reference/change-events

  // This sample function will listen for events and replicate them to a collection in a different Database

  // Access the _id of the changed document:
  const docId = changeEvent.documentKey._id;

  // Get the MongoDB service you want to use (see "Linked Data Sources" tab)
  const serviceName = "mongodb-atlas";
  const databaseName = "other_db_name";
  const collection = context.services
    .get(serviceName)
    .db(databaseName)
    .collection(changeEvent.ns.coll);

  // Get the "FullDocument" present in the Insert/Replace/Update ChangeEvents
  try {
    // If this is a "delete" event, delete the document in the other collection
    if (changeEvent.operationType === "delete") {
      await collection.deleteOne({ _id: docId });
    }

    // If this is an "insert" event, insert the document into the other collection
    else if (changeEvent.operationType === "insert") {
      await collection.insertOne(changeEvent.fullDocument);
    }

    // If this is an "update" or "replace" event, then replace the document in the other collection
    else if (
      changeEvent.operationType === "update" ||
      changeEvent.operationType === "replace"
    ) {
      await collection.replaceOne({ _id: docId }, changeEvent.fullDocument);
    }
  } catch (err) {
    console.log("error performing mongodb write: ", err.message);
  }
};
