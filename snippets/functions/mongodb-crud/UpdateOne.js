exports = async function(productIdToUpdate){
  // Find the name of the MongoDB service you want to use (see "Linked Data Sources" tab)
  var serviceName = "mongodb-atlas";

  // Update these to reflect your db/collection
  var dbName = "sample_supplies";
  var collName = "sales";

  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);

  const query = { "_id": productIdToUpdate };
  
  const update = {
    "$set": {
      "price": 20.99,
    }
  };
  
  const options = { "upsert": false };
  
  try {
    updateResult = await collection.updateOne(query, update, options);
    return updateResult["updatedId"];

  } catch(err) {
    console.log("Failed to update item: ", err.message);
    return { error: err.message };
  }
};
