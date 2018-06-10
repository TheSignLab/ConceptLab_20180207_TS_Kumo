module.exports = {

    processingError: function (error, done) {
        console.log(error);
    },


    processingSuccessfull: function (res, done) {
        var $ = res.$;

        var hrefs = [];
        var href = "";
        
        var nextPage =  $('a[ctype="nav.next"]').attr("href");

        $(".main-results a").each(function (i, elem) {
            href = $(this).attr("href");
                hrefs.push(href);
        });
        
        
        
        
        
        var output = {
            hrefs : hrefs,
            nextPage : nextPage
        }
        return output;
    }








};
