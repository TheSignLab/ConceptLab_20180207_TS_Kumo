/*
    ---------------------------------------------
    
        Directorio Judicial Scrapper 2018 
        
    ---------------------------------------------
*/






// ----------------------------------------------- //
var db = [];
// ----------------------------------------------- //









// ----------------------------------------------- //
function getUserCodeByKeyword(keyword, callback_p) {



    var out = ["M605691-0004-4/view",
               "M130558-0020-4/view",
               "M1019272-0296-4/view",
               "M97057-0296-4/view",
               "M41433-0296-4/view",
               "M114484-6194-4/view"];


    c.queue([{
        uri: 'http://busquedas.dafp.gov.co/search?btnG=Buscar&client=Hojas_de_vida&output=xml_no_dtd&proxystylesheet=Hojas_de_vida&sort=date:D:L:d1&oe=UTF-8&ie=UTF-8&ud=1&getfields=*&wc=200&wc_mc=1&lr=lang_es&exclude_apps=1&site=Hojas_de_Vida&filter=0&entqr=3&ulang=es&ip=186.84.41.105&access=p&entqrm=0&q=bogota+inmeta:DPTO%3DBogotá%2520D%252EC&dnavs=inmeta:DPTO%3DBogotá%2520D%252EC&start=1',
        callback: function (error, res, done) {
            if (error) {
                console.log(error);
            } else {
                var $ = res.$;
                $(".main-results a").each(function (i, elem) {
                    var _href = $(this).attr("href").replace("http://www.sigep.gov.co/hdv/-/directorio/","");
                    out.push(_href);
                });
                console.log("Numero de uri por esta keyword  :  " + out.length)
                callback_p(out);
                
            }
            done();
        }
    }]);
    
}

function getUserDataByUserCode(usercode, callback) {
    var obj = {
        name: "",
        position: "",
        institution: "",
        email: "",
        phone: [],
        website: "",
        academic: [],
        work: []
    };


    callback(obj)
}

function getInfo(res) {

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
    var c_academic = $(".zona_directorio_detail ul li")
    var c_work = $("table");

    _obj.name = c_name.text();
    _obj.position = c_position.text();
    _obj.institution = c_institution.text();

    c_contacto.each(function (i, elem) {
        var p = $(this).text();
        if (p.includes("@")) {
            _obj.email = p;
        } else {
            _obj.phone.push(p);
        }
    });

    c_academic.each(function (i, elem) {
        var p = $(this).text();
        _obj.academic.push(p);
    });

    c_work.each(function (i, elem) {
        var p = $(this).text();
        if (!p.includes("Rangos de salario por nivel")) {
            $(this).find("tr").each(function (i, elem) {
                var tds = $(this).find("td");
                if (tds.eq(0).text() != "Cargos") {
                    var job = {
                        description: tds.eq(0).text(),
                        institution: tds.eq(1).text(),
                        start: tds.eq(2).text(),
                        end: tds.eq(3).text()
                    }
                    _obj.work.push(job);
                }
            });
        }
    });

    return _obj;
};

function save_db() {
    console.log("Guardando base de datos ....");
    console.log(" ");
    console.log(" ");
    console.log(db);
    console.log(db.length);

    fs.writeFile('./exports/data.json', JSON.stringify(db, null, 2), 'utf-8', function () {});
}
// ----------------------------------------------- //









// ----------------------------------------------- //
var mongo = require('mongodb');
const fs = require('fs');
const cw = require('crawler');
const seeds = require('./seeds.json');

const base_url = "http://www.sigep.gov.co/hdv/-/directorio/";
const json_file = "exports/persons.json";

var state = [];
// ----------------------------------------------- //


// ----------------------------------------------- //
db_k = 0;
var c = new cw({
    rateLimit: 1000, // `maxConnections` will be forced to 1
    callback: function (err, res, done) {
        obj = getInfo(res);
        db.push(obj);
        console.log("... Crawled "+obj.name)
        db_k = db_k+1;

        done();
    }
});
// ----------------------------------------------- //




console.log('\033[2J');
console.log("Crawler Init ");
console.log(" ");

for (var kSeed = 0; kSeed < seeds.length; kSeed++) {
    getUserCodeByKeyword(seeds[kSeed], function (userCodeList) {
        for (var kUserCode = 0; kUserCode < userCodeList.length; kUserCode++) {
            console.log("Search in " + seeds[kSeed] + " ---> UserCode : " + userCodeList[kUserCode])
            if ((kUserCode == (userCodeList.length - 1)) ) {
                console.log("........Cerrando API........");
                var _uri = base_url + userCodeList[kUserCode];
                var _callback = function (err, res, done) {
                    obj = getInfo(res);
                    db.push(obj);
                    done();
                    save_db();
                }
                var options = [{
                    uri: _uri,
                    callback: function (error, res, done) {
                        if (error) {
                            console.log(error);
                        } else {
                            _callback(error, res, done);
                        }
                        done();
                    }
                }];
                c.queue(options);
            } else {
                c.queue(base_url + userCodeList[kUserCode]);
            }
        }
    });
}
