var casper = require("casper").create({
  clientScripts: ["./assets/jquery.min.js"]
});

var username = "miguelmayorga2014@gmail.com";
var password = "JUGUETICO2018";

casper.start();

casper.open("https://www.computrabajo.com.co");

casper.then(function() {
  // Login
  var self = this;
  console.log(document.querySelector("div"));
});

casper.then(function() {
  this.echo("...........................");
  this.echo(" Fin ");
  this.echo("...........................");
  this.exit();
});
casper.run();
