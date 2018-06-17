var db = [];

function getPersonDataByUserCode(person_url, i, imax, k, kmax) {

    const base_url = "http://www.sigep.gov.co/hdv/-/directorio/";
    const database_path = "db_persons.json";

    const fs = require('fs');
    const cw = require("crawler");

    var list = [];

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

    const person_cw = new cw({
        maxConnections: 10,
        callback: function (error, res, done) {
            if (error) {
                console.log("Error")
            } else {
                var $ = res.$;

                var c_name = $(".nombre_funcionario");
                var c_position = $(".cargo_funcionario");
                var c_institution = $(".institucion_funcionario");
                var c_contacto = $(".texto_detalle_directorio");
                var c_academic = $(".zona_directorio_detail ul li")
                var c_work = $("table");

                obj.name = c_name.text();
                obj.position = c_position.text();
                obj.institution = c_institution.text();

                c_contacto.each(function (i, elem) {
                    var p = $(this).text();
                    if (p.includes("@")) {
                        obj.email = p;
                    } else {
                        obj.phone.push(p);
                    }
                });

                c_academic.each(function (i, elem) {
                    var p = $(this).text();
                    obj.academic.push(p);
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
                                obj.work.push(job);
                                
                                done();
                            }
                        });
                    }
                });
                post_crawl(obj,i, imax, k, kmax);
                

            }
        }
    });


    person_cw.queue(base_url + person_url);




    function post_crawl(obj,i, imax, k, kmax) {

        db.push(obj);
        
        console.log(db.length)
        
        if ((i == (imax - 1)) && (k == (kmax - 1))) {
            var json = JSON.stringify(db);
            fs.writeFile(database_path, json, 'utf8', function(){
                console.log("Everything is Ok Bitch!")
            });
        }

    }

}

function getUserCodesByKeywordSearch(keyword, k, kmax, callback) {

    var resultingList = ["M605691-0004-4/view",
                         "M130558-0020-4/view",
                         "M114484-6194-4/view"];
    callback(resultingList, k, kmax);

}









var keywordsSeed = ["bogota", "dian"];

for (var k = 0; k < keywordsSeed.length; k++) {

    var _keyword = keywordsSeed[k];
    var k = k;
    var kmax = keywordsSeed.length;

    getUserCodesByKeywordSearch(_keyword, k, kmax, function (list, k, max) {

        for (var i = 0; i < list.length; i++) {

            var i = i;
            var imax = list.length;

            getPersonDataByUserCode(list[i], i, imax, k, kmax);
        }
    });
};
