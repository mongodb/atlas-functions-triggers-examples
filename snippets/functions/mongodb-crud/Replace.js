exports = async function (changeEvent) {
  var collection = context.services
    .get("mongodb-atlas")
    .db("sample_supplies")
    .collection("sales");

  // To test the above example, insert the following document into your collection:
  //await collection.insertOne({"storeLocation":"East Appleton","couponUsed":false}, {upsert:true});

  const query = { storeLocation: changeEvent.fullDocument.storeLocation };

  const replacement = {
    storeLocation: "Orangeville",
    couponUsed: false,
  };

  const options = { returnNewDocument: true };

  try {
    return await collection.findOneAndReplace(query, replacement, options);
  } catch (err) {
    console.log("Failed to replace item: ", err.message);
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
    _id: "62548f79e7f11292792497cc"
  },
  fullDocument: {
    _id: "599af247bb69cd89961c986d",
    storeLocation: 'East Appleton'
  }
})*/