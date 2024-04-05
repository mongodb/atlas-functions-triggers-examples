import { Credentials } from "realm";
import { ObjectId } from "bson";
import { getDeviceSDKApp, sleep } from "../utils";
import { DeleteResult, InsertOneResult } from "mongodb";

describe("Test MongoDB CRUD operations in Functions", () => {
  test("Test inserting and deleting a document with Functions", async () => {
    let insertedObjectId: ObjectId | null = null;

    // Set up a new sale document to insert
    const saleDate = new Date();
    const items = [
      {
        name: "envelopes",
        tags: ["office", "stationary"],
        price: 0.5,
        quantity: 2,
      },
      {
        name: "manuscript paper",
        tags: ["office", "stationary"],
        price: 0.3,
        quantity: 5,
      },
    ];
    const storeLocation = "Scranton";
    const customer = {
      gender: "agender",
      age: 42,
      email: "mary.shelly@example.com",
      sastisfaction: 4,
    };
    const couponUsed = false;
    const purchaseMethod = "Carrier Pigeon";
    const args = {
      saleDate: saleDate,
      items: items,
      storeLocation: storeLocation,
      customer: customer,
      couponUsed: couponUsed,
      purchaseMethod: purchaseMethod,
    };

    // Use Device SDK to call the Function to insert the document
    const app = getDeviceSDKApp();
    const anonCredentials = Credentials.anonymous();
    const user = await app.logIn(anonCredentials);
    expect(user).toBeTruthy;

    try {
      const insertResult = (await user.functions.mongodbCrud_insertOne(
        args
      )) as InsertOneResult<Document>;

      if (insertResult instanceof ObjectId) {
        insertedObjectId = insertResult;
      }
    } catch (error) {
      if (error instanceof Error) {
        fail(error.message);
      }
    }

    // Ensure document has been inserted
    expect(insertedObjectId).not.toBeNull;

    const deleteResult = (await user.functions.mongodbCrud_deleteOne(
      insertedObjectId
    )) as DeleteResult;

    // Ensure document has been deleted
    expect(deleteResult).toBe(1);
  }, 30000);
});
