exports = async function (objectIdToDelete) {
  // Find the name of the MongoDB service you want to use (see "Linked Data Sources" tab)
  var serviceName = "mongodb-atlas";

  // Update these to reflect your db/collection
  var dbName = "sample_supplies";
  var collName = "sales";

  // Get a collection from the context
  var collection = context.services
    .get(serviceName)
    .db(dbName)
    .collection(collName);

  try {
    // Execute a DeleteOne in MongoDB
    const query = { _id: objectIdToDelete };
    deleteResult = await collection.deleteOne(query);
    return deleteResult["deletedCount"];
  } catch (err) {
    console.log("Failed to delete item: ", err.message);
    return { error: err.message };
  }
};
