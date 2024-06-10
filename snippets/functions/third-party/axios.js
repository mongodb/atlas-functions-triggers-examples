exports = async function () {
  const axios = require("axios").default;
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts/2",
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data.userId;
};
