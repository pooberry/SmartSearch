var CSVFile;
var CSVName;
var CSVDomain;
var CSVAuth;
//var token;
//var parsedResults;

getChromeVariables();

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("submitFile").addEventListener("click", Run2);
}); //event listiner for form submission. 

function Run2() {
    FileStore();

    
}

function FileStore() {
    CSVFile = document.getElementById("file").files[0];
    console.log(CSVFile.name);

}

function getChromeVariables() {

    chrome.storage.local.get(["token"], function (result) {
        token = result.token;
    })
    chrome.storage.local.get(["duplicateValidateOnOff"], function (result) {
        duplicateCheckCSV = result.duplicateValidateOnOff;
    });
}

function FileParse() {
    return new Promise(function (resolve, reject) {
        Papa.parse(CSVFile, {
            header: true,
            dynamicTyping: true,
            complete: function (results) {
                //parsedResults = results;
                //console.log(results);
                if (results.length != 0 || results.length != undefined) {
                    resolve(results);
                } else {
                    reject(error("CSV was not able to be parsed correctly"));
                }



            }

        });
    })

}



