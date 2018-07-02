var fs = require('fs');
var cw = require('crawler');
var jsonfile = require('jsonfile');

module.exports = class BotKeywords {
    constructor() {
        var self = this;
        this.mode = null;
        this.database = null;
        this.base = null;
        this.query = null;
        this.key = null;
        this.nKeywords = 0;
        this.keywords = [];

        var options = {
            rateLimit: 1000, // `maxConnections` will be forced to 1
            callback: function (err, res, done) {
                self.getKeywordsAndGoOn(err, res, done)
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

    setQuery(query) {
        this.query = query;
    }

    setKey(key) {
        this.key = key;
    }

    run() {

        console.log("The Bot is Running");

        var file = this.database;

        if (!fs.existsSync(file)) {
            var obj = {
                keyword: "bogota"
            }
            jsonfile.writeFileSync(file, obj);
        }

        this.prevKeyword = jsonfile.readFileSync(file);

        for (var k = 0; k < this.prevKeyword.length; k++) {

            var queryString = this.base + this.query.replace(this.key, this.prevKeyword[k]);
            this.nKeywords = this.nKeywords + 1;
            this.crawler.queue(queryString);

        }

    }

    getKeywordsAndGoOn(err, res, done) {
        var newKeywords = [];

        var $ = res.$;

        $("li a").each(function () {
            var _this = this;
            var _thisWord = $(_this).attr("title") + "";
            for(var k =0 ; k< 50; k++){
                _thisWord = _thisWord.replace(" ", "+");
            }
            newKeywords.push(_thisWord);
        });


        //AT Finish
        console.log(this.nKeywords)
        if (this.nKeywords < 5000) {
            for (var k = 0; k < newKeywords.length; k++) {
                var queryString = this.base + this.query.replace(this.key, newKeywords[k]);
                this.nKeywords = this.nKeywords + 1;
                this.crawler.queue(queryString);
                this.keywords.push(newKeywords[k]);

                done();
            }
        } else {
            var _keywords = this.keywords;
            var uniquekeywords = _keywords.filter(function (item, pos) {
                return _keywords.indexOf(item) == pos;
            })
            console.log("He acabado aca.");
            console.log(uniquekeywords);
            jsonfile.writeFile(this.database, uniquekeywords, function (err) {
                console.error(err)
            })
            done();

        }



    }



}
