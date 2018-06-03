/* 
    --------------------------------------------------------------

        Kumo Lib For Web Scrapping
        Author : Jorge Luis Mayorga
        Update : 3/06/18
    
    --------------------------------------------------------------
*/


'use strict';





// ---------------------------------------------- //
// Dependencies (i.e Imports, Require)            //
// ---------------------------------------------- //
var cw = require("crawler");
var fs = require('fs');
// ---------------------------------------------- //






// ---------------------------------------------- //
// Kumo's Class 
// ---------------------------------------------- //
class Kumo {

    // constructor()
    constructor() {
        this.name = 'Mayorga Abogados Directorio Judicial Crawler';
    }

    welcome(mainURL) {

        console.log('\x1Bc')

        var obj = [mainURL];
        var json = JSON.stringify(obj);

        var fs = require('fs');
        fs.writeFile('myjsonfile.json', json, 'utf8', function () {
            console.log(" -> File : url.json is reseted")
        });

        console.log(" ");
        console.log("       -------------------------------------------     ");
        console.log("       --------- Welcome to Kumo Crawler ---------     ")
        console.log("       -------------------------------------------     ");
        console.log(" ");
        console.log(" ");

    }


    //Set And Get Methods
    setURL(URLPath) {
        var obj = JSON.parse(fs.readFileSync(URLPath, 'utf8'));
        this.urls = obj;
    }

    setConfig(ConfigPath) {
        this.ConfigPath;
    }
    setCallback(Callback) {
        this.processing = Callback;
    }

    //Init Crawler
    initCrawler() {

    }




}
module.exports = Kumo;
// ---------------------------------------------- //
