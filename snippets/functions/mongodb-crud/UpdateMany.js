exports = async function(query, updateFilter){
  // Find the name of the MongoDB service you want to use (see "Linked Data Sources" tab)
  var serviceName = "mongodb-atlas";

  // Update these to reflect your db/collection
  var dbName = "sample_supplies";
  var collName = "sales";

  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);

  // Exampke update filter:
  /*const updateFilter = {
    "$set": {
      "storeId": storeId,
    }
  };*/
  
  const options = { "upsert": false };

  try {
    updateResult = await collection.updateOne(query, updateFilter, options);
    console.log(JSON.stringify(updateResult));
    return updateResult;

  } catch(err) {
    console.log("Failed to update item(s): ", err.message);
    return { error: err.message };
  }
};
