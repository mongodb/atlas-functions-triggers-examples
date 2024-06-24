exports = async function(number1, number2){

  // To call other named functions:
  var result = context.functions.execute("sum", number1, number2);

  return result;
};

// This examples calls a function named "sum" that looks like this:
/*
  exports = async function(number1, number2) {
    return number1 + number2
  };
*/