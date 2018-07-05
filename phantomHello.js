var casper = require("casper").create({
  clientScripts: ["./assets/jquery.min.js"]
});

var username = "miguelmayorga2014@gmail.com";
var password = "JUGUETICO2018";

casper.start("https://www.computrabajo.com.co");

casper.then(function() {
  console.log("Iniciando Fantasma");

  document.querySelector("#txEmail").value = username;
  document.querySelector("#txPwd").value = password;
});
casper.then(function() {
  document.querySelector("#btnLogin").click();
});
casper.then(function() {
  /*
  var HomeTitle = document.querySelector(".perfil_e h1").value;
  console.log(HomeTitle);
  */
});

casper.then(function() {
  this.exit();
});

casper.run();
