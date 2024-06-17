exports = async function (changeEvent) {
  var collection = context.services
    .get("mongodb-atlas")
    .db("sample_supplies")
    .collection("sales");

  const query = { _id: new BSON.ObjectId(saleId) };

  const replacement = {
    storeLocation: "East Appleton",
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

// To test the above example, insert the following document into your collection:
// {"_id":{"$oid":"62548f79e7f11292792497cc"},"storeLocation":"East Appleton","couponUsed":false}

// Then, in the testing console paste the code below and click Run to test this mock change event against the example code
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
    userName: 'alice123',
    _id: {
      "$oid": "62548f79e7f11292792497cc"
    }
  },
  fullDocument: {
    _id: {
      "$oid": "599af247bb69cd89961c986d"
    },
    userName: 'alice123',
    name: 'Alice'
  }
})
*/
