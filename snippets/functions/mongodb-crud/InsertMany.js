exports = async function (changeEvent) {
  var collection = context.services
    .get("mongodb-atlas")
    .db("sample_supplies")
    .collection("sales");

  try {
    var result = await collection.insertMany([
      {"storeLocation":changeEvent.fullDocument.storeLocation, "items":changeEvent.fullDocument.items},
      ]);
    return result;
  } catch (err) {
    console.log("Failed to insert items: ", err.message);
    return { error: err.message };
  }
}

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
    _id: {
      "$oid": "62548f79e7f11292792497cc"
    }
  },
  fullDocument: {
    _id: {
      "$oid": "599af247bb69cd89961c986d"
    },
    storeLocation: 'East Appleton',
    items: ["envelopes"]
  }
})
*/