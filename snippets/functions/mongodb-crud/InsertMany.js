exports = async function(args){
  // Find the name of the MongoDB service you want to use (see "Linked Data Sources" tab)
  var serviceName = "mongodb-atlas";

  // Update these to reflect your db/collection
  var dbName = "sample_supplies";
  var collName = "sales";

  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);

  var newItem1 = {
    "saleDate": args.saleDate,
    "items": ["chocolate", "roses"],
    "storeLocation": args.storeLocation,
    "customer": 987,
    "couponUsed": false,
    "purchaseMethod": "in-store"
  };
  var newItem2 = {
    "saleDate": args.saleDate,
    "items": ["phone"],
    "storeLocation": args.storeLocation,
    "customer": 123,
    "couponUsed": true,
    "purchaseMethod": "online"
  };
  
  try {
    insertResult = await collection.insertMany([newItem1, newItem2]);
    return insertResult["insertedId"];

  } catch(err) {
    console.log("Failed to insert item(s): ", err.message);
    return { error: err.message };
  }
};
