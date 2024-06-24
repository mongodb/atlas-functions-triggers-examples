exports = async function (changeEvent) {

  console.log(JSON.stringify(changeEvent));
  
  var collection = context.services
    .get("mongodb-atlas")
    .db("sample_supplies")
    .collection("sales");

   // To test this example, uncomment the following line:
   // await collection.updateOne({"_id":changeEvent._id._data,"storeLocation":"East Appleton","couponUsed":false}, {upsert:true});
  
  const query = { _id: changeEvent._id._data };

  const updateFields = {
    storeLocation: "West Appleton",
    couponUsed: true,
  };

  try {
    await collection.updateOne(query, updateFields);
    return await collection.findOne(query);
  } catch (err) {
    console.log("Failed to update item: ", err.message);
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
    _id: "62548f79e7f11292792497cc"
  },
  fullDocument: {
    _id: "62548f79e7f11292792497cc",
    storeLocation: 'East Appleton',
    couponUsed: false
  }
})
*/