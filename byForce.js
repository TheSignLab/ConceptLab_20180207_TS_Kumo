var fs = require('fs');

// http://www.sigep.gov.co/hdv/-/directorio/M1132211-0125-4/view
const max_M = 9999;
const max_D = 999;
const max_N = 9;

function saveToJSON(in_data) {

    const content = JSON.stringify(in_data);
    fs.writeFile("./byForce.json", content, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}

function intToStrUsingLeft(nr, n, str) {
    return Array(n - String(nr).length + 1).join(str || '0') + nr;
}


let keyArray = [];
for (let m = 0; m < max_M; m++) {


    var remainder = m % 100;
    if (remainder == 0) {
        console.log("Loading  ... [" + (m / max_M * 100).toFixed(4) + "] %")
    }

    for (let d = 0; d < max_D; d++) {
        let var_m = intToStrUsingLeft(m, 7);
        let var_d = intToStrUsingLeft(d, 4);
        let var_n = 4;
        let var_string = "M" + var_m + "-" + var_d + "-" + var_n;
        keyArray.push(var_string);
    }
}

saveToJSON(keyArray);
