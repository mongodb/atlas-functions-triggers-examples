exports = async function () {
  // A Scheduled Trigger will always call a function without arguments.
  // Documentation on Triggers: https://www.mongodb.com/docs/atlas/app-services/triggers/

  // Functions run by Triggers are run as System users and have full access to Services, Functions, and MongoDB Data.

  // Get the MongoDB service you want to use (see "Linked Data Sources" tab)
  const serviceName = "mongodb-atlas";
  const databaseName = "db_name";
  const collectionName = "coll_name";
  const collection = context.services
    .get(serviceName)
    .db(databaseName)
    .collection(collectionName);

  try {
    const doc = await collection.findOne({ name: "mongodb" });
  } catch (err) {
    console.log("error performing mongodb findOne: ", err.message);
  }
};
