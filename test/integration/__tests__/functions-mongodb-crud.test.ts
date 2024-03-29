import { App, Credentials } from "realm";
import { ObjectId } from 'bson';
import { getDeviceSDKApp, sleep } from "../utils";

describe("Test MongoDB CRUD operations in Functions", () => {
    let insertedObjectId: ObjectId;

    test("Test inserting a document with a Function", async () => {
        // Set up the new sale document to insert
        const saleDate = new Date();
        const items = [
            {
                "name": "envelopes",
                "tags": ["office", "stationary"],
                "price": 0.50,
                "quantity": 2
            },
            {
                "name": "manuscript paper",
                "tags": ["office", "stationary"],
                "price": 0.30,
                "quantity": 5
            }
        ];
        const storeLocation = "Scranton";
        const customer = {
            "gender": "agender",
            "age": 42,
            "email": "mary.shelly@example.com",
            "sastisfaction": 4
        };
        const couponUsed = false;
        const purchaseMethod = "Carrier Pigeon";
        const args = {
            "saleDate": saleDate,
            "items": items,
            "storeLocation": storeLocation,
            "customer": customer,
            "couponUsed": couponUsed,
            "purchaseMethod": purchaseMethod
        };

        // Use Device SDK to call the Function to insert the document
        const app = getDeviceSDKApp();
        const anonCredentials = Credentials.anonymous();
        const user = await app.logIn(anonCredentials);
        const result = await user.functions.mongodbCrud_insertOne(args);
        
        if (result instanceof ObjectId) {
            insertedObjectId = result;
        }

        expect(insertedObjectId).not.toBeNull;
    }, 30000);

    test("Test deleting a document with a Function", async () => {
        // Use Device SDK to call the Function to insert the document
        const app = getDeviceSDKApp();
        const anonCredentials = Credentials.anonymous();
        const user = await app.logIn(anonCredentials);
        if (insertedObjectId) {
            const result = await user.functions.mongodbCrud_deleteOne(insertedObjectId);
            expect(result).toBe(1);
        } else {
            fail("The insertedObjectId is null so we can't delete it");
        }
    }, 30000);
});