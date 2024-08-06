const imports = require('./math');
const fruits = require('./fruits');
const figlet = require('figlet');

figlet("Raj this side", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});


