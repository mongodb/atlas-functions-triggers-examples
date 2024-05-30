exports = async function(saleId){
  var serviceName = "mongodb-atlas";
  var dbName = "sample_supplies";
  var collName = "sales";

  var collection = context.services.get(serviceName).db(dbName).collection(collName);
  const query = { "_id": new BSON.ObjectId(saleId) };
  try {
    doc = await collection.findOne(query);
    console.log('found:', JSON.stringify(doc));
    return doc;

  } catch(err) {
    console.log("Failed to find item: ", err.message);
    return { error: err.message };
  }
};
