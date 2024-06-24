exports = async function(args){
  // Find the name of the MongoDB service you want to use (see "Linked Data Sources" tab)
  var serviceName = "mongodb-atlas";

  // Update these to reflect your db/collection
  var dbName = "sample_supplies";
  var collName = "sales";

  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);

  try {
    docs = await collection.find(args);
    console.log(JSON.stringify(docs));
    return docs;

  } catch(err) {
    console.log("Failed to find item: ", err.message);
    return { error: err.message };
  }
}