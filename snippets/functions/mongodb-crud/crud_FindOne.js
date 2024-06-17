exports = async function(_id){
  // Find the name of the MongoDB service you want to use (see "Linked Data Sources" tab)
  var serviceName = "mongodb-atlas";

  // Update these to reflect your db/collection
  var dbName = "sample_supplies";
  var collName = "sales";

  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);
  
  const query = { "_id": new BSON.ObjectId(_id) };
  const projection = {
   "title": 1,
   "quantity": 1,
  }

  try {
    doc = await collection.findOne(query, projection);
    return doc;

  } catch(err) {
    console.log("Failed to find item: ", err.message);
    return { error: err.message };
  }
};