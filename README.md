# Atlas Functions and Triggers Examples

This is the main repo for all MongoDB App Services Function and Trigger examples.
The examples in this repo are all tested to ensure that they work as expected.

A GitHub Action uploads to the atlas-functions-triggers-examples S3 bucket.
A push to the `development` branch uploads to the `development` directory,
and a push to `main` uploads to the `production` directory.

For bucket access, consult the Developer Docs team.

## Add Function and Trigger Snippets

The Developer Docs team maintains these code snippets as tested examples.
Adding a new snippet involves:

1. Adding a Function or Trigger to the Atlas backend (ask Dev Docs for details 
   and access).
2. Adding a relevant test for the Function or Trigger to the test suite. Refer to 
   the README in the `test/integration` directory for more details.
3. Exporting or pulling the Atlas backend with your Function or Trigger, and adding 
   the relevant file(s) to this repository's `backend`.
4. Running the Bluehawk script in the `tools` directory to copy the files from the 
   backend into the `snippets` files that get uploaded to S3.
5. Adding a metadata file to the `metadata` directory with a title and other 
   relevant details based on the type of snippet you're adding.

Details about filenames and metadata schema will be added to this repository
after the spec is finalized.

If you are not a member of the Bushicorp org, create your own test app to test 
the Function or Trigger, and the Developer Docs team will import your Function 
or Trigger into the org test app as part of your PR. You can use the `backend`
in this repository to create your own test app that should run the entire test
suite successfully.

<!-- TODO: Add more details about the repo structure and its purpose -->
