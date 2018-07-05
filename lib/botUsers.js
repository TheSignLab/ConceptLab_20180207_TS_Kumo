var fs = require("fs");
var cw = require("crawler");
var jsonfile = require("jsonfile");

module.exports = class BotUsers {
  constructor() {
    var self = this;
    this.mongodb = null;
    this.mode = null;
    this.database = null;
    this.base = null;
    this.query = null;
    this.key = null;
    this.nUsers = 0;
    this.users = [];

    var options = {
      rateLimit: 100, // `maxConnections` will be forced to 1
      callback: function(err, res, done) {
        self.getUsers(err, res, done);
      }
    };
    this.crawler = new cw(options);
  }

  setMode(mode) {
    this.mode = mode;
  }

  setMongoDB(mongodb) {
    this.mongodb = mongodb;
  }

  setCodesDatabase(database) {
    this.codes_database = database;
  }

  setDatabase(database) {
    this.database = database;
  }

  setBase(base) {
    this.base = base;
  }

  setQuery(query) {
    this.query = query;
  }

  setKey(key) {
    this.key = key;
  }

  run() {
    console.log("The Bot is Running");

    var file = this.codes_database;
    console.log("Reading " + file);
    this.codes = jsonfile.readFileSync(file);
    console.log("N of Entries : " + this.codes.length);
    this.maxUsers = this.codes.length - 1;
    for (var k = 0; k < this.codes.length; k++) {
      var queryString = this.codes[k];

      this.crawler.queue(queryString);
    }
  }

  getUsers(err, res, done) {
    var $ = res.$;
    var _obj = {
      name: "",
      position: "",
      institution: "",
      email: "",
      phone: [],
      website: "",
      academic: [],
      work: []
    };
    var c_name = $(".nombre_funcionario");
    var c_position = $(".cargo_funcionario");
    var c_institution = $(".institucion_funcionario");
    var c_contacto = $(".texto_detalle_directorio");
    var c_academic = $(".zona_directorio_detail ul li");
    var c_work = $("table");

    _obj.name = c_name.text();
    _obj.position = c_position.text();
    _obj.institution = c_institution.text();

    c_contacto.each(function(i, elem) {
      var p = $(this).text();
      if (p.includes("@")) {
        _obj.email = p;
      } else {
        _obj.phone.push(p);
      }
    });

    c_academic.each(function(i, elem) {
      var p = $(this).text();
      _obj.academic.push(p);
    });

    c_work.each(function(i, elem) {
      var p = $(this).text();
      if (!p.includes("Rangos de salario por nivel")) {
        $(this)
          .find("tr")
          .each(function(i, elem) {
            var tds = $(this).find("td");
            if (tds.eq(0).text() != "Cargos") {
              var job = {
                description: tds.eq(0).text(),
                institution: tds.eq(1).text(),
                start: tds.eq(2).text(),
                end: tds.eq(3).text()
              };
              _obj.work.push(job);
            }
          });
      }
    });

    this.addToMongoDb(_obj);

    this.nUsers = this.nUsers + 1;
    console.log(this.nUsers);
    done();
  }

  addToMongoDb(obj) {
    console.log("object added to MongoDB");
  }
};
