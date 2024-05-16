exports = async function(productId, replacement){
  console.log(productId);
  console.log(replacement);
  // Find the name of the MongoDB service you want to use (see "Linked Data Sources" tab)
  var serviceName = "mongodb-atlas";

  // Update these to reflect your db/collection
  var dbName = "sample_supplies";
  var collName = "sales";

  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);

  const query = { "_id": BSON.ObjectId(productId) };
  // an example replacement ojbect:
  /*const replacement = {
      "storeLocation": "East Appleton",
      "couponUsed": true,
  };*/

const options = { "returnNewDocument": true };

  try {
    return await collection.findOneAndReplace(query, replacement, options);
  } catch(err) {
    console.log("Failed to replace item: ", err.message);
    return { error: err.message };
  }
};