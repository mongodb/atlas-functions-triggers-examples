import { Credentials } from "realm";
import { ObjectId } from "bson";
import { getDeviceSDKApp, sleep } from "../utils";
import { DeleteResult, InsertOneResult, InsertManyResult, Int32, BSON } from "mongodb";
import { UpdateResult } from "realm/dist/public-types/internal";

describe("Test MongoDB CRUD operations in Functions", () => {
  test("Test inserting and deleting a document with Functions", async () => {

    class Sale {
        _id: ObjectId = new ObjectId();
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

// CHANGE EVENT //
    const changeEvent = {
    _id: {_data: new ObjectId("599af247bb69cd89961c986d") },
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
      _id: "599af247bb69cd89961c986d"
    },
    fullDocument: {
      _id: "599af247bb69cd89961c986d",
      storeLocation: 'East Appleton',
      couponUsed: true,
      items: null,

    }
  };

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
    let resultId: ObjectId = new ObjectId();
    
    try {
      const insertResult = (await user.functions.crud_InsertOne(
        changeEvent
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
    expect(ids.length).toBe(1);

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
  

    class foo{"insertedIds":string[];}
    //let allIds: string[] = new Array();
   
    try {
      const insertManyResult = await user.functions.crud_InsertMany(
        changeEvent
      ) as foo;

      //expect(insertManyResult.insertedIds[0]).toContain("sds")
      ids.push(new ObjectId(insertManyResult.insertedIds[0]));

      const insertManyResult2 = (await user.functions.crud_InsertMany(
        changeEvent
      )) as foo;

      ids.push(new ObjectId(insertManyResult2.insertedIds[0]));
      
    } catch (error) {
      if (error instanceof Error) {
        fail(error.message);
      }
    }
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
        changeEvent)) as Sale;

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
    expect(replaceResult.storeLocation).toBe("Orangeville");
      

// *********** //
// UPDATEONE //
    /* returns
      "_id": {
        "$oid": "6644e8613e720767b85fee9f"
      },
      "storeLocation": "East Appleton",
      "couponUsed": true
    }*/
      
      changeEvent._id._data = ids[0];

      let updateResult: Sale = new Sale();

      try {
        updateResult = await user.functions.crud_UpdateOne(
          changeEvent) as Sale;
      } catch (error) {
        if (error instanceof Error) {
          fail(error.message);
        }
      }

      expect(updateResult).not.toBeNull();//("saDfweasdFAs")
        
// *********** //
// FindOne //

  changeEvent._id._data = updateResult._id;
  let foundResult: Sale = new Sale();
  try {
    foundResult = await user.functions.crud_FindOne(
      changeEvent) as Sale;
  } catch (error) {
    if (error instanceof Error) {
      fail(error.message);
    }
  }

  expect(foundResult.storeLocation).toBe("West Appleton");


// *********** //
// UPDATEMANY //

/* returns
{"matchedCount":{"$numberInt":"0"},
  "modifiedCount":{"$numberInt":"0"},
  "upsertedId":{"$oid":"6679d49446b20ed3fae5541c"}}
*/
    let count = 0;
    let updateManyResult: Sale[] = new Array();
    try {
      const result = await user.functions.crud_UpdateMany(
        changeEvent) as Sale;
        updateManyResult.push(result);
        count = updateManyResult.length;
    } catch (error) {
      if (error instanceof Error) {
        fail(error.message);
      }
    }
    expect(count).toBe(1);

// *********** //
// Find (Many) //

    changeEvent.fullDocument.storeLocation = "Langley"
    let findResults: Sale[] = [];

    try {
      findResults = await user.functions.crud_Find(
        changeEvent) as Sale[];
    } catch (error) {
      if (error instanceof Error) {
        fail(error.message);
      }
    }

    expect(findResults).not.toBeNull;
    expect(findResults[0].purchaseMethod).toBe("credit");
    expect(findResults[0].storeLocation).toBe("Langley");

// *********** //
// DeleteOne //
    const deleteResult = await user.functions.crud_DeleteOne(
      changeEvent
    ) as DeleteResult;
    expect(deleteResult).toBe(1);

// *********** //
// DeleteMany //
    let deleteManyCount: number;
    deleteManyCount = 0;

    deleteManyCount = await user.functions.crud_DeleteMany(changeEvent) as number;

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