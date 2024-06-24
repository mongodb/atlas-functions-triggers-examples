exports = async function(changeEvent){
  var serviceName = "mongodb-atlas";
  var dbName = "sample_supplies";
  var collName = "sales";

  var collection = context.services.get(serviceName).db(dbName).collection(collName);
  const query = { "_id": changeEvent.documentKey._id };
  
  const projection = {
    _id:0,
    storeLocation:1,
    items: 1
  }
  
  try {
    doc = await collection.findOne(query, projection);
    return doc;
  } catch(err) {
    console.log("Failed to find item: ", err.message);
    return { error: err.message };
  }
};

// In the Testing Console tab, paste the code below and click Run:
/*
exports({
  _id: {_data: '62548f79e7f11292792497cc' },
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
    _id: '62548f79e7f11292792497cc'
  },
  fullDocument: {
    _id: "599af247bb69cd89961c986d",
    storeLocation: 'East Appleton',
    items: ["envelopes"]
  }
})
*/