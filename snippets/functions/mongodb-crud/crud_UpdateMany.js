exports = async function (changeEvent) {
  var collection = context.services
    .get("mongodb-atlas")
    .db("sample_supplies")
    .collection("sales");

  // To test thia example, uncomment the following line:
  // collection.updateOne({"storeLocation":"East Appleton","couponUsed":false})

  const query = { storeLocation: changeEvent.fullDocument.storeLocation };
  
  // Example update filter:
  const updateFilter = {
    "$set": {
      "storeLocation": "West Appleton"
    }
  };
  
  const options = { "upsert": false };

  try {
    updateResult = await collection.updateMany(query, updateFilter, options);
    return updateResult;

  } catch(err) {
    console.log("Failed to update item(s): ", err.message);
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
    couponUsed: false
  }
})
*/