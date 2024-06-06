import { MongoClient } from "mongodb";
import { App } from "realm";
import "dotenv/config";

function getDeviceSDKApp() {
  const appId = "atlas-functions-triggers-szivjrs";
  const app = new App({ id: appId! });

  return app;
}

function connectToMongoDbClient() {
  const { DB_USER, DB_PASSWORD } = process.env;
  const mongoDbConnectionUri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.nr3ko.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(mongoDbConnectionUri);

  return client;
}

function sleep(timeout: number) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}

export { getDeviceSDKApp, connectToMongoDbClient, sleep };
