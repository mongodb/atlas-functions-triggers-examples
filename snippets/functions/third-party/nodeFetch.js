exports = async function () {
  const fetch = require("node-fetch"); // require calls must be in exports function
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/2", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const result = await response.json();
  return result.userId;
};
