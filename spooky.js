try {
  var Spooky = require("spooky");
} catch (e) {
  var Spooky = require("../lib/spooky");
}

var username = "miguelmayorga2014@gmail.com";
var password = "JUGUETICO2018";
var url = "https://www.computrabajo.com.co";

try {
  var Spooky = require("spooky");
} catch (e) {
  var Spooky = require("../lib/spooky");
}

var spooky = new Spooky(
  {
    child: {
      command: "casperjs.cmd",
      transport: "http"
    },
    casper: {
      logLevel: "debug",
      verbose: true,
      options: {
        clientScripts: ["./assets/jquery.min.js"]
      }
    }
  },
  function(err) {
    if (err) {
      e = new Error("Failed to initialize SpookyJS");
      e.details = err;
      throw e;
    }

    spooky.start(url);
    spooky.then(function() {
      this.emit(
        "hello",
        "Hello, from " +
          this.evaluate(function() {
            return document.querySelector(".content_left h3").innerHTML;
          })
      );
    });
    spooky.run();
  }
);

spooky.on("error", function(e, stack) {
  console.error(e);

  if (stack) {
    console.log(stack);
  }
});

spooky.on("console", function(line) {
  console.log(line);
});

spooky.on("hello", function(greeting) {
  console.log(greeting);
});

spooky.on("log", function(log) {
  if (log.space === "remote") {
    console.log(log.message.replace(/ \- .*/, ""));
  }
});
