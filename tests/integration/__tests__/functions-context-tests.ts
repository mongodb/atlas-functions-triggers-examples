import { Credentials } from "realm";
import { getDeviceSDKApp, sleep } from "../utils";

describe("Test Other Functions", () => {
  test("Test Context Functions", async () => {

    const app = getDeviceSDKApp();
    const anonCredentials = Credentials.anonymous();
    const user = await app.logIn(anonCredentials);
    expect(user).toBeTruthy;

    const result = (await user.functions.context_callFunction(
        1,7
      )) as number;

    expect(result).toBe(8);
  })
})