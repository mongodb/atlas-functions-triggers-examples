exports = async function(changeEvent){
  // Find the name of the MongoDB service you want to use (see "Linked Data Sources" tab)
  var serviceName = "mongodb-atlas";

  // Update these to reflect your db/collection
  var dbName = "sample_supplies";
  var collName = "sales";

  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);

  // To test this example, uncomment the following line:
  await collection.insertOne({"storeLocation":changeEvent.fullDocument.storeLocation, "couponUsed":true});

  try {
    findResults = await collection.find({storeLocation: changeEvent.fullDocument.storeLocation});
    return findResults;
  } catch(err) {
    console.log("Failed to find item: ", err.message);
    return { error: err.message };
  }
}

// In the Testing Console tab, paste the code below and click Run:
/*
exports({
  _id: {_data: '599af247bb69cd89961c986d' },
  operationType: 'insert',
  clusterTime: {
    "$timestamp": {
      t: 1649712420,
      i:6
    }
  },
  ns: {
    db: 'engineering',
    coll: 'users'
  },
  documentKey: {
    storeLocation: 'East Appleton',
    _id: "599af247bb69cd89961c986d"
  },
  fullDocument: {
    _id: "599af247bb69cd89961c986d",
    storeLocation: 'East Appleton',
    couponUsed: false
  }
});
*/