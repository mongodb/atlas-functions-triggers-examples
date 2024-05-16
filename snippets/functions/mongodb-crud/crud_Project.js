exports = async function(saleId, projection={}){
  var serviceName = "mongodb-atlas";
  var dbName = "sample_supplies";
  var collName = "sales";

  var collection = context.services.get(serviceName).db(dbName).collection(collName);
  const query = { "_id": new BSON.ObjectId(saleId) };
  // An example of the projection object that might be passed in:
  /*const projection = {
    _id:0,
    storeLocation:1,
    items: 1
  }*/
  try {
    doc = await collection.findOne(query, projection);
    console.log('found:', JSON.stringify(doc));
    return doc;

  } catch(err) {
    console.log("Failed to find item: ", err.message);
    return { error: err.message };
  }
};
