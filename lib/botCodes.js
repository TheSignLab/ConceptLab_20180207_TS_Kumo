var fs = require('fs');
var cw = require('crawler');
var jsonfile = require('jsonfile');

module.exports = class BotCodes {
    constructor() {
        var self = this;
        this.mode = null;
        this.database = null;
        this.keywords_database = null;
        this.base = null;
        this.query = null;
        this.key = null;
        this.nCodes = 0;
        this.codes = [];

        var options = {
            rateLimit: 1000, // `maxConnections` will be forced to 1
            callback: function (err, res, done) {
                self.getCodesAndGoOn(err, res, done)
            }
        }
        this.crawler = new cw(options);

    }

    setMode(mode) {
        this.mode = mode;
    }

    setDatabase(database) {
        this.database = database;
    }

    setBase(base) {
        this.base = base;
    }

    setKeywordDatabase(base) {
        this.keywords_database = base;
    }

    setKeywordBase(base) {
        this.keyword_base = base;
    };
    setKeywordQuery(query) {
        this.keyword_query = query;
    };
    setKeywordKey(key) {
        this.keyword_key = key;
    };

    setQuery(query) {
        this.query = query;
    }

    setKey(key) {
        this.key = key;
    }

    run() {

        console.log("The Bot is Running");

        var file = this.keywords_database;

        this.keywords = jsonfile.readFileSync(file);

        for (var k = 0; k < this.keywords.length; k++) {

            var queryString = this.keyword_base + this.keyword_query.replace(this.keyword_key, this.keywords[k]);
            this.crawler.queue(queryString);

        }

    }

    getCodesAndGoOn(err, res, done) {
        var $ = res.$;
        var self = this;
        var nextPage = $();

        $('.main-results a').each(function () {
            var _this = this;
            var _this_href = $(_this).attr("href");
            self.codes.push(_this_href);
                        self.nCodes = self.nCodes + 1;

        });
        if ($('a[ctype="nav.next"]') && self.nCodes < 25000) {
            nextPage = "http://busquedas.dafp.gov.co/" + $('a[ctype="nav.next"]').attr("href");
            this.crawler.queue(nextPage);
            console.log(self.nCodes)
        } else {
            console.log("LLegue a mi fin");
             var _codes = self.codes;
            var uniqueCodes = _codes.filter(function (item, pos) {
                return _codes.indexOf(item) == pos;
            })
             jsonfile.writeFile(this.database,uniqueCodes, function (err) {
                console.error(err)
            })
        }

        done();




    }



}
