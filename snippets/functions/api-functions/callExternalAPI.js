exports = async function(arg){
  const url = "https://api.stackexchange.com/2.3/answers?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&page=1&pagesize=10&order=desc&sort=activity&filter=default";

  const response = await context.http.get({ url: url })
  // The response body is a BSON.Binary object, so parse it:
  const result = EJSON.parse(response.body.text())
  // console.log(JSON.stringify(result));
  return result;
}