exports = async function(args){
  // Find the name of the MongoDB service you want to use (see "Linked Data Sources" tab)
  var serviceName = "mongodb-atlas";

  // Update these to reflect your db/collection
  var dbName = "sample_supplies";
  var collName = "sales";

  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);

  try {
    insertResult = await collection.insertMany(args);
    console.log('insertResult ids:', insertResult.insertedIds);
    console.log('insertResult length:', insertResult.insertedIds.length);
    console.log('returning', JSON.stringify(insertResult));
    return insertResult;

  } catch(err) {
    console.log("Failed to insert item(s): ", err.message);
    return { error: err.message };
  }
};
