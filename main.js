var Crawler = require("crawler");
var fs = require('fs');
var k = 0;

var url = "http://busquedas.dafp.gov.co/search?btnG=Buscar&client=Hojas_de_vida&output=xml_no_dtd&proxystylesheet=Hojas_de_vida&sort=date:D:L:d1&oe=UTF-8&ie=UTF-8&ud=1&getfields=*&wc=200&wc_mc=1&lr=lang_es&exclude_apps=1&site=Hojas_de_Vida&filter=0&entqr=3&ulang=es&ip=190.147.24.37&access=p&entqrm=0&q=bogota+inmeta:DPTO%3DBogot%C3%A1%2520D%252EC&dnavs=inmeta:DPTO%3DBogot%C3%A1%2520D%252EC&start=0";
process.stdout.write('\033c');
reset();

function reset() {
    
    fs.readFile('./output.json', 'utf-8', function (err, data) {
        if (err) throw err

        var arrayOfObjects = JSON.parse(data)
        arrayOfObjects.href = [];
        

        fs.writeFile('./output.json', JSON.stringify(arrayOfObjects), 'utf-8', function (err) {
            if (err) throw err
            console.log('Done!')
        })
    })
}

var c = new Crawler({
    maxConnections: 10,
    // This will be called for each crawled page
    callback: function (error, res, done) {
        if (error) {
            console.log(error);
        } else {



            var $ = res.$;

            var list = [];


            for (var i = 0; i < 9; i++) {

                var item = $(".main-results div p a")[i];
                list.push($(item).attr("href"));
 
            }

            


            fs.readFile('./output.json', 'utf-8', function (err, data) {
                if (err) throw err

                var arrayOfObjects = JSON.parse(data)
                for (var i = 0; i < 9; i++) {
                    arrayOfObjects.href.push(list[i])
                }
                fs.writeFile('./output.json', JSON.stringify(arrayOfObjects), 'utf-8', function (err) {
                    if (err) throw err
                   
                })
            });
            
            if($(".b a")){
               var nextPageLink = $(".b a").attr("href");
                setQueueNext("http://busquedas.dafp.gov.co/"+nextPageLink);
                k = k +1;
               console.log(nextPageLink )
            }
           else{
                var nextPageLink = $(".b a").attr("href");
               console.log(nextPageLink )
              done(); 
           }






        }
        
    }
});


function setQueueNext(url){
    c.queue(url);

     
}

c.queue(url);
