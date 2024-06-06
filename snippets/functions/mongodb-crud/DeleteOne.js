exports = async function(deleteFilter){
  var serviceName = "mongodb-atlas";
  var dbName = "sample_supplies";
  var collName = "sales";

  // example deleteFilter:
  // { _id: ObjectId("123")}
  
  var collection = context.services.get(serviceName).db(dbName).collection(collName);
  
  try {
    deleteResult = await collection.deleteOne(deleteFilter);
    return deleteResult["deletedCount"];

  } catch(err) {
    console.log("Failed to delete item: ", err.message);
    return { error: err.message };
  }
};
