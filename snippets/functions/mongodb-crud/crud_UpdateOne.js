exports = async function(productIdToUpdate, updateFilter){
  var serviceName = "mongodb-atlas";
  var dbName = "sample_supplies";
  var collName = "sales";
  var collection = context.services.get(serviceName).db(dbName).collection(collName);

  const query = { "_id": productIdToUpdate };
  
  // example update filter:
  /*const updatefilter = {
    "$set": {
      "price": 20.99,
    }
  };*/
  
  const options = { "upsert": false };
  
  try {
    updateResult = await collection.updateOne(query, updateFilter, options);
    console.log(JSON.stringify(updateResult));
    return updateResult;

  } catch(err) {
    console.log("Failed to update item: ", err.message);
    return { error: err.message };
  }
};
