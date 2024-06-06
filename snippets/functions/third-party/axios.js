exports = async function () {
  const axios = require("axios").default;
  const response = await axios.get("https://api.github.com/users/octocat", {
    headers: { "Content-Type": "application/json" },
  });
  return response.data.login;
};
