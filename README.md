# Atlas Functions and Triggers Examples

This is the main repo for all MongoDB App Services Function and Trigger examples.
The examples in this repo are all tested to ensure that they work as expected.

A GitHub Action uploads to the atlas-functions-triggers-examples S3 bucket.
A push to the `development` branch uploads to the `development` directory,
and a push to `main` uploads to the `production` directory.

For bucket access, consult the Developer Docs team.

## Adding Function and Trigger Snippets

The Developer Docs team maintains these code snippets as tested examples.
When you add a new function, be sure to:

1. Add a Function or Trigger to the Atlas backend (ask Dev Docs for details 
   and access). Follow these rules when creating a function or trigger:

   - Function names **must** start with their type, which is one of `api_`, 
     `crud_`, or `context_`. 
   - Functions must be tested within the AAS app.
   - Triggers should use the "fake_function_for_expressions" 
     function, since we're only creating triggers to extract the ``match`` and ``project`` stages and  nothing function-related. Following this rule means we don't end up with any additional functions in the repo.

2. Deploy your changes. This will automatically push the changes to the *source* repo, where github actions will remove function name prefixes, extract the ``match`` and ``project`` json from the triggers, and then copy the functions and expressions to this repo.

3. Update the `manifest.json` file in the correct subfolder (snippets/functions/crud, for example) with your new function. Be sure to generate a new uuid for the `id` field. 

4. Add a relevant test for the function or trigger to the test suite. Refer to the README in the `test/integration` directory for more details.

## Adding a New Function Category

If we decide we need a type of function beyond CRUD, function context, third-party integration, and API calls, do the following:

1. Coordinate with dev and product for naming the new `viewType` and subfolder.
2. Create the new subfolder that will contain these functions.
3. Copy an existing `manifest.json` file from one of the other function types and update it with the following:
   a. The new `viewType`
   b. The new snippets. Even if there is only 1 new snippet, be sure it is in an array.
4. In the `atlas-functions-triggers-source` repo, you **must** update the `/.github/workflows/Copy-Functions-to-Examples-Repo.yml` action to copy the new category functions. Each function category has a section in the github action that looks like this:
```
 - name: Copy API Functions
        uses: MongoCaleb/copy-push-files@main
        env:
          API_TOKEN_GITHUB: "${{ secrets.API_TOKEN_GITHUB }}"
        with:
          source_files: ./functions/api_*
          remote_repository: https://github.com/mongodb/atlas-functions-triggers-examples
          target_dir: "snippets/functions/api-functions/"
          target_branch: "development"
          access_token:  "${{ secrets.API_TOKEN_GITHUB }}"
   ```
Copy one of these sections and change the `source_files`, `target_dir` values.