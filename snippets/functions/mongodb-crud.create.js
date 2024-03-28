exports = async function (payload, response) {
    const body = EJSON.parse(payload.body.text());
    const { field1, field2, field3 } = body;
    const collection = context.services
      .get("mongodb-atlas")
      .db("your_database")
      .collection("your_collection");
    try {
      const result = await collection.insertOne({
        field1: field1,
        field2: field2,
        field3: field3,
        createdAt: new Date(),
      });
      response.setStatusCode(201);
      response.setBody({ status: "success", data: result.insertedId });
    } catch (error) {
      response.setStatusCode(500);
      response.setBody({ status: "error", message: error.message });
    }
  };