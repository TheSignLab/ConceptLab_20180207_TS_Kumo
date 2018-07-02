var fs = require('fs');
var cw = require('crawler');
var jsonfile = require('jsonfile');


const raw_1 = require('./database/keywords.json');
const raw_2 = require('./database/keywords0.json');

var out_file = "./database/keywords.min.json";

const oso_horrendo = raw_1.concat(raw_2);
const raw = oso_horrendo;

var unique = raw.filter(function (item, pos) {
    return raw.indexOf(item) == pos;
});

jsonfile.writeFile(out_file, unique, function (err) {
    console.log("Merge " + unique.length)
})
