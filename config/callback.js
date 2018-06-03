module.exports = {

    processingError: function (error, done) {
        console.log(error);
    },


    processingSuccessfull: function (res, done) {
        var $ = res.$;

        var hrefs = [];
        var href = "";
        
        var nextPage =  $(".b a").attr("href");

        $(".main-results a").each(function (i, elem) {
            href = $(this).attr("href");
            if (href) {
                hrefs.push(href);
            }

        });
        
        
        
        var output = {
            hrefs : hrefs,
            nextPage : nextPage
        }
        return output;
    }








};
