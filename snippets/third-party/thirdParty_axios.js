exports = function () {
  var axios = require("axios").default;
  return axios
    .get("https://api.github.com/users/octocat")
    .then((response) => response.data.login);
};
