exports = function () {
  var axios = require("axios");
  return axios.default
    .get("https://www.example.com")
    .then((response) => response.datas);
};
