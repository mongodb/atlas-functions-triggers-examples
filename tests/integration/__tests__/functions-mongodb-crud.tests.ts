import { Credentials } from "realm";
import { ObjectId } from "bson";
import { getDeviceSDKApp, sleep } from "../utils";
import { DeleteResult, InsertOneResult, InsertManyResult, Int32, BSON } from "mongodb";
import { UpdateResult } from "realm/dist/public-types/internal";

describe("Test MongoDB CRUD operations in Functions", () => {
  test("Test inserting and deleting a document with Functions", async () => {

    class Sale {
        saleDate?: Date;
        items?: StoreItem[];
        storeLocation?: string;
        customer?: Customer;
        couponUsed?: false;
        purchaseMethod?: string;
    }
    class StoreItem {
      category?: string;
      name?: string;
      tags?: string[];
      price?: number;
      quantity?: number;
    };

    class Customer {
      constructor(
        age?: number,
        email?: string,
        satisfaction?: number
    ){}
    };

    let ids: ObjectId[] = [];

    let StoreItems: StoreItem[] = [
      {
        category: "supplies",
        name: "envelopes",
        tags: ["office", "stationary"],
        price: 0.5,
        quantity: 2,
      },
      {
        category: "supplies",
        name: "manuscript paper",
        tags: ["office", "stationary"],
        price: 0.3,
        quantity: 5,
      },
    ];

    const app = getDeviceSDKApp();
    const anonCredentials = Credentials.anonymous();
    const user = await app.logIn(anonCredentials);
    expect(user).toBeTruthy;

    // *********** //
    // InsertOne //
    /* returns:
    {
      "insertedId": {
        "$oid": "664515f357125435e7b3e9b6"
      }
    }*/
    const customer = new Customer(42,"mary.shelly@example.com",4);

    const insertOneArgs = new Sale();
      insertOneArgs.saleDate = new Date(),
      insertOneArgs.items = StoreItems,
      insertOneArgs.storeLocation = "Scranton",
      insertOneArgs.customer = customer,
      insertOneArgs.couponUsed = false,
      insertOneArgs.purchaseMethod = "Trinkets";

    let resultId: ObjectId = new ObjectId();
    
    try {
      const insertResult = (await user.functions.crud_InsertOne(
        insertOneArgs
      )) as InsertOneResult;

    
      if (insertResult.insertedId instanceof ObjectId) {
        resultId = insertResult.insertedId;
      }
    } catch (error) {
      if (error instanceof Error) {
        fail(error.message);
      }
    }
    ids.push(resultId);
    expect(ids[0]).toBe(resultId);

// *********** //
// InsertMany //
  /* returns {
    "insertedIds": [
      {
        "$oid": "66451ab2478f0c527f12cab4"
      },
      {
        "$oid": "66451ab2478f0c527f12cab5"
      }
    ]
  }*/
  const insertManyArgs = [{
    saleDate: new Date(),
    StoreItems: StoreItems,
    storeLocation: "Hoboken",
    customer: customer,
    couponUsed: false,
    purchaseMethod: "Carrier Pigeon",
  }, {
    saleDate: new Date(),
    StoreItems: StoreItems,
    storeLocation: "Armpit, NJ",
    customer: customer,
    couponUsed: false,
    purchaseMethod: "Carrier Pigeon"
  }
]

    class foo{"insertedIds":string[];}
    let insertedIds: foo = new foo();
    try {
      const insertManyResult = (await user.functions.crud_InsertMany(
        insertManyArgs
      )) as foo;

      insertedIds = insertManyResult;

    } catch (error) {
      if (error instanceof Error) {
        fail(error.message);
      }
    }
    insertedIds.insertedIds.forEach(id => {
      ids.push(new ObjectId(id));
    });

    expect(ids).not.toBeNull;
    expect(ids.length).toBe(3);

// *********** //
// Project //
   let projectResult;

    const projectionFilter = {
      _id:0,
      storeLocation:1,
      items: 1
    };

    try {
      projectResult = (await user.functions.crud_Project(
        ids[0].toString(), projectionFilter)) as Sale;

    } catch (error) {
      if (error instanceof Error) {
        fail(error.message);
      }
    }

    expect(projectResult).not.toBeNull;
   /* expect(projectResult.storeLocation).not.toBeNull;
    expect(projectResult.storeLocation).toBe("Scranton");
    expect(projectResult.items?.length).toBe(2);
    expect(projectResult.saleDate).toBeNull;*/

    const changeEvent = {
      _id: {_data: ids[0].toString() },
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
    };


// *********** //
// REPLACE //
    /* returns
      "_id": {
        "$oid": "6644e8613e720767b85fee9f"
      },
      "storeLocation": "East Appleton",
      "couponUsed": true
    }*/

    let replaceResult: Sale = new Sale();

    try {
      replaceResult = await user.functions.crud_Replace(
        changeEvent) as Sale;
    } catch (error) {
      if (error instanceof Error) {
        fail(error.message);
      }
    }
    
    expect(replaceResult.couponUsed).toBe(false);
    expect(replaceResult.storeLocation).toBe("East Appleton");
      

// *********** //
// UPDATEONE //
    /* returns
      "_id": {
        "$oid": "6644e8613e720767b85fee9f"
      },
      "storeLocation": "East Appleton",
      "couponUsed": true
    }*/
      
      let updateResult: Sale = new Sale();

      try {
        updateResult = await user.functions.crud_UpdateOne(
          changeEvent) as Sale;
      } catch (error) {
        if (error instanceof Error) {
          fail(error.message);
        }
      }

        
// *********** //
// FindOne //

      let updatedDocumentResult: Sale = new Sale();
      try {
        updatedDocumentResult = await user.functions.crud_FindOne(
          changeEvent) as Sale;
      } catch (error) {
        if (error instanceof Error) {
          fail(error.message);
        }
      }
      expect(updatedDocumentResult.couponUsed).toBe(true)
      expect(updatedDocumentResult.storeLocation).toBe("West Appleton");


// *********** //
// UPDATEMANY //
    /* returns
      "_id": {
        "$oid": "6644e8613e720767b85fee9f"
      },
      "storeLocation": "East Appleton",
      "couponUsed": true
    }*/
    let count;

    const updateManyFindFilter = {
      "purchaseMethod": "Carrier Pigeon"
    };

    const updateManyResultFilter = {
      "storeLocation": "Langley",
      purchaseMethod: "Carrier Pig"
    };

    try {
      const updateOneResult = (await user.functions.crud_UpdateMany(
        updateManyFindFilter, updateManyResultFilter)) as UpdateResult<Sale>;
        count = updateOneResult.modifiedCount;
    } catch (error) {
      if (error instanceof Error) {
        fail(error.message);
      }
    }

    expect(count).toBe(1);

// *********** //
// Find (Many) //
    let findResults: Sale[] = [];

    try {
      findResults = (await user.functions.crud_Find(
        {purchaseMethod: "Carrier Pig"})) as Sale[];
    } catch (error) {
      if (error instanceof Error) {
        fail(error.message);
      }
    }

    expect(findResults).not.toBeNull;
    //expect(findResults.length).toBe(2);
    expect(findResults[0].purchaseMethod).toBe("Carrier Pig");
    expect(findResults[0].storeLocation).toBe("Langley");

// *********** //
// DeleteOne //
    const deleteResult = await user.functions.crud_DeleteOne(
      {}
    ) as DeleteResult;
    expect(deleteResult).toBe(1);

// *********** //
// DeleteMany //
    let deleteManyCount: number;
    deleteManyCount = 0;

    deleteManyCount = await user.functions.crud_DeleteMany({}) as number;

    //commented out because if any test fails, this doesn't run
    //TODO: investigate tear-down style test so this always works
    
   //expect(deleteManyCount).toBe(2);
}, 6000);
})

/*
order of tests:

✓ InsertOne
✓ InsertMany
✓ FindOne
✓ Project
✓ Replace
✓ UpdateOne
✓ UpdateMany
✓ Find
✓ DeleteOne
✓ DeleteMany

*/

/* 
UPDATED WITH CHANGE EVENT

  InsertOne
  InsertMany
✓ FindOne
  Project
✓ Replace
✓ UpdateOne
  UpdateMany
  Find
  DeleteOne
  DeleteMany
*/