/*
    ---------------------------------------------
    
        Directorio Judicial Scrapper 2018 
        
    ---------------------------------------------
*/

// ----------------------------------------------- //
const cw = require("crawler");

const settings = require("./settings.json");

const BotKeywords = require("./lib/botKeywords.js");
const BotCodes = require("./lib/botCodes.js");
const BotUsers = require("./lib/botUsers.js");

const name = settings["name"];
const path_keywords = settings["file_keywords"];
const path_codes = settings["file_codes"];
const path_users = settings["file_users"];

const base_keyword = settings["url_base_search"];
const query_keyword = settings["url_query_search"];
const key_keyword = settings["url_key_search"];

const base_code = settings["url_base_code"];
const query_code = settings["url_query_code"];
const key_code = settings["url_key_code"];

// ----------------------------------------------- //

// ----------------------------------------------- //
console.log("\033[2J");
console.log("Crawler Init => " + name);
console.log(" ");

// ---- Create Collection ---- //
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(
  url,
  { useNewUrlParser: true },
  function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb2");
    var myobj = { name: "Company Inc", address: "Highway 37" };
    dbo.collection("customers").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  }
);

MongoClient.connect(
  url,
  function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb2");
    dbo.collection("customers").findOne({}, function(err, result) {
      if (err) throw err;
      console.log(result.name);
      db.close();
    });
  }
);

// ----------------------------------------------- //

// ----------------------------------------------- //
/*
var botKeywords = new BotKeywords();
botKeywords.setMode("new");
botKeywords.setDatabase(path_keywords);
botKeywords.setBase(base_keyword);
botKeywords.setQuery(query_keyword);
botKeywords.setKey(key_keyword);
botKeywords.run();
*/
// ----------------------------------------------- //

// ----------------------------------------------- //

/*
var botCodes = new BotCodes();
botCodes.setMode("new");

botCodes.setKeywordDatabase(path_keywords);
botCodes.setKeywordBase(base_keyword);
botCodes.setKeywordQuery(query_keyword);
botCodes.setKeywordKey(key_keyword);

botCodes.setDatabase(path_codes);
botCodes.setBase(base_code);
botCodes.setQuery(query_code);
botCodes.setKey(key_code);
botCodes.run();

*/
// ----------------------------------------------- //

/* var botUsers = new BotUsers();
botUsers.setMode("new");
botUsers.setMongoDB(MongoClient);
botUsers.setCodesDatabase(path_codes);
botUsers.setDatabase(path_users);
botUsers.setBase(base_code);
botUsers.setQuery(query_code);
botUsers.setKey(key_code);
botUsers.run();
 */
