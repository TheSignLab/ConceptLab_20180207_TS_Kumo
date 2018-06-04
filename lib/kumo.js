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
        this.url = "http://busquedas.dafp.gov.co/search?btnG=Buscar&client=Hojas_de_vida&output=xml_no_dtd&proxystylesheet=Hojas_de_vida&sort=date:D:L:d1&oe=UTF-8&ie=UTF-8&ud=1&getfields=*&wc=200&wc_mc=1&lr=lang_es&exclude_apps=1&site=Hojas_de_Vida&filter=0&entqr=3&ulang=es&ip=190.147.24.37&access=p&entqrm=0&q=bogota+inmeta:DPTO%3DBogot%C3%A1%2520D%252EC&dnavs=inmeta:DPTO%3DBogot%C3%A1%2520D%252EC&start=0";
        this.page = 0;
    }

    welcome(mainURL) {


        var obj = [mainURL];
        var json = JSON.stringify(obj);

        var fs = require('fs');
        fs.writeFile(this.urlPath, json, 'utf8', function () {
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
        this.urlPath = URLPath;
    }

    setConfig(ConfigPath) {
        this.ConfigPath;
    }
    setCallback(Callback) {
        this.processingError = Callback.processingError;
        this.processingSuccessfull = Callback.processingSuccessfull;
    }

    //Init Crawler
    init() {
        var self = this;

        self.crawler = new cw({
            maxConnections: 8000,
            // This will be called for each crawled page
            callback: function (error, res, done) {
                if (error) {

                    self.processingError(error, done);

                } else {

                    var q = self.processingSuccessfull(res, done);

                    var qhrefs = q.hrefs;
                    var qnextpage = q.nextPage;

                    self.saveLinks(qhrefs);

                    if (qnextpage) {
                        self.page = self.page + 10;
                        var base = "http://busquedas.dafp.gov.co/search?btnG=Buscar&client=Hojas_de_vida&output=xml_no_dtd&proxystylesheet=Hojas_de_vida&sort=date:D:L:d1&oe=UTF-8&ie=UTF-8&ud=1&getfields=*&wc=200&wc_mc=1&lr=lang_es&exclude_apps=1&site=Hojas_de_Vida&filter=0&entqr=3&ulang=es&ip=190.147.24.37&access=p&entqrm=0&q=bogota+inmeta:DPTO%3DBogot%C3%A1%2520D%252EC&dnavs=inmeta:DPTO%3DBogot%C3%A1%2520D%252EC&start=";
                        self.crawler.queue(base + self.page);
                        console.log("Cambio de Pagina  @ " + self.page)
                    }



                }
            }
        });


        self.crawler.queue(self.url);


    }

    saveLinks(links) {
        var self = this;
        fs.readFile(self.urlPath, function (err, data) {
            var json = JSON.parse(data);
            console.log("links.length : " + links.length);
            for(let k=0;k<links.length;k++){
                json.push(links[k].replace("http://www.sigep.gov.co/hdv/-/directorio/","/"));
            }
            fs.writeFile(self.urlPath, JSON.stringify(json), function () {})
        })
    }




}
module.exports = Kumo;
// ---------------------------------------------- //
