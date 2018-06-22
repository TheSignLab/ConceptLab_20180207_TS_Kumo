/*
    ---------------------------------------------
    
        Directorio Judicial Scrapper 2018 
        
    ---------------------------------------------
*/






// ----------------------------------------------- //

// Require External Scripts
const fs = require('fs');
const cw = require('crawler');
const seeds = require('./seeds.json');

//Storage File
var db_all = [];
var db_usercode = [];

//Init URL Strings
const URL_Base = 'http://busquedas.dafp.gov.co';
const URL_Query = '/search?q=cti&btnG=Buscar&client=Hojas_de_vida&output=xml_no_dtd&proxystylesheet=Hojas_de_vida&sort=date%3AD%3AL%3Ad1&oe=UTF-8&ie=UTF-8&ud=1&getfields=*&wc=200&wc_mc=1&lr=lang_es&exclude_apps=1&site=Hojas_de_Vida&getfields=*&filter=0&lr=lang_es&entqr=';
const URL_Init = URL_Base + URL_Query + '1';


const UserCode_URL_Base = "http://www.sigep.gov.co/hdv/-/directorio/";
const Persons_FilePath = "exports/persons.json";
// ----------------------------------------------- //



// ----------------------------------------------- //
var keywordsCrawlerOptions = {
    rateLimit: 1000, // `maxConnections` will be forced to 1
    callback: function (err, res, done) {
        done();
    }
}
var c = new cw(keywordsCrawlerOptions);
// ----------------------------------------------- //



// ----------------------------------------------- //
console.log('\033[2J');
console.log("Crawler Init ");
console.log(" ");
// ----------------------------------------------- //



// Loop por cada Palabra clave (Keyword) //
for (var kSeed = 0; kSeed < seeds.length; kSeed++) {

    var thisKeyword = seeds[kSeed];

    // Normal Keywords
    if (kSeed < (seeds.length - 1)) {
        console.log("Keyword : " + thisKeyword)
        keywordsCallback(URL_Init, thisKeyword, function (userKeyword, userCodes, next) {
            processingPage(userKeyword, userCodes, next);
        });
    } else {
        console.log("Last Keyword : " + thisKeyword);
        console.log(" - ");
        console.log(" - ");
    }

}



function keywordsCallback(url, keyword, keywordCallback) {
    c.queue([{
        uri: url,
        callback: function (error, res, done) {
            if (error) {
                console.log(error);
            } else {
                var $ = res.$;
                var list = [];
                $(".main-results a").each(function (i, elem) {
                    var _href = $(this).attr("href").replace("http://www.sigep.gov.co/hdv/-/directorio/", "");
                    list.push(_href);
                });
                var next = "";
                next = URL_Base + $('a[ctype="nav.next"]').attr("href");
                keywordCallback(keyword, list, next);
            }
            done();
        }
    }]);
}


function processingPage(userKeyword, userCodes, next) {
    // Loop por toda la lista de Ususario para esta Keyword //
    for (var kUserCode = 0; kUserCode < userCodes.length; kUserCode++) {

        // Actua URL
        var thisUserCodeURL = UserCode_URL_Base + userCodes[kUserCode];

        if (kUserCode < (userCodes.length - 1)) {
            db_usercode.push(thisUserCodeURL);
        } else {
            db_usercode.push(thisUserCodeURL);
            if (!next.includes("undefined")) {
                keywordsCallback(next, userKeyword, function (userKeyword, userCodes, next) {
                    processingPage(userKeyword, userCodes, next);
                });
                var nPage = next.replace("http://busquedas.dafp.gov.co/search?q=cti&btnG=Buscar&client=Hojas_de_vida&output=xml_no_dtd&proxystylesheet=Hojas_de_vida&sort=date:D:L:d1&oe=UTF-8&ie=UTF-8&ud=1&getfields=*&wc=200&wc_mc=1&lr=lang_es&exclude_apps=1&site=Hojas_de_Vida&filter=0&entqr=1&ulang=&ip=190.147.24.37&access=p&entqrm=0&start=", "");
                console.log(nPage)
            } else {
                run_usercrawler();
            }

        }
    };
}



function run_usercrawler() {
    console.log("Ahora si Perras");
    var jsonfile = require('jsonfile')

    var file = './exports/data_usercode.json'
    var obj = db_usercode;
    jsonfile.writeFile(file, obj, {
        spaces: 2,
        EOL: '\r\n'
    }, function (err) {
        console.error(err)
    })
}
