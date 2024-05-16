exports = async function(args){
  console.log(JSON.stringify(args));
  
  var serviceName = "mongodb-atlas";
  var dbName = "sample_supplies";
  var collName = "sales";

  var collection = context.services.get(serviceName).db(dbName).collection(collName);
  
  try {
    deleteResult = await collection.deleteMany(args);
    return deleteResult["deletedCount"];
  } catch(err) {
    console.log("Failed to delete item: ", err.message);
    return { error: err.message };
  }
};
