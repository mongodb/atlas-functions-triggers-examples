import { jest } from "@jest/globals";
import { Credentials } from "realm";
import { getDeviceSDKApp } from "./utils";

jest.setTimeout(10000);

global.console = {
  ...global.console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};

global.beforeEach(async () => {
  const app = getDeviceSDKApp();

  const anonCredentials = Credentials.anonymous();
  const user = await app.logIn(anonCredentials);

  // TODO: delete all cluster data before running tests. Need to create
  // a new function for this.
  // await user.callFunction("deleteAll");
});
