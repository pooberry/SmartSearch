var CSVFile;
var CSVName;
var CSVDomain;
var CSVAuth;
//var token;
//var parsedResults;

getChromeVariables();

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("submitFile").addEventListener("click", Run2);
});//event listiner for form submission. 

function Run2() {
    FileStore();



    FileParse().then((message) => {
        let data = message;
        console.log(data.data);
        for (var i = 0; i < data.data.length; i++) //
        {
            CSVName = data.data[i].name;
            CSVDomain = data.data[i].domain;
            CSVAuth = data.data[i].auth;

            //lowerCase
            CSVName = CSVName.toLowerCase();
            CSVDomain = CSVDomain.toLowerCase();
            CSVAuth = CSVAuth.toLowerCase();

            //domain removal
            CSVDomain = CSVDomain.replace(/^https?:\/\//, '');

            if(duplicateCheckCSV != true){
                SubmitRequest2(CSVName, CSVDomain, CSVAuth).then((message)=>{
                    console.log(message);
    
                }).catch((message)=>{
    
                    console.log(message);
                })
            }
            if(duplicateCheckCSV == true)
            {
                
            }    




        }


    }).catch((message) => {
        let data = message
        alert(data);
    })
}

function FileStore() {
    CSVFile = document.getElementById("file").files[0];
    console.log(CSVFile.name);

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

function getChromeVariables()
{
    
chrome.storage.local.get(["token"], function (result) {
    token = result.token;
    })
    chrome.storage.local.get(["duplicateValidateOnOff"], function (result) {
        duplicateCheckCSV = result.duplicateValidateOnOff;
    });
}

function SubmitRequest2(name, domain, auth) {
    return new Promise(function (resolve,reject) {

        if(name== "" || name == null || name == undefined || domain == "" || domain == null || domain == undefined)
        {
            reject(error("No Valid data found on line "));
        }// catch blank lines. 

        if(auth == null || auth == undefined || auth == "" || auth == "null")
        {
            var data = new FormData();
            data.append("account_domain_lookup[name]", name);
            data.append("account_domain_lookup[domain]", domain);
            
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    console.log(this.responseText);
                    let responseCode = this.status;
                    
                    resolve("Run status " + responseCode);
                }
            });

            xhr.open("POST", "https://siteadmin.instructure.com/api/v1/account_domain_lookups/");
            xhr.setRequestHeader("Authorization", "Bearer " + token);
            
            xhr.send(data);
        }

        else{
            var data = new FormData();
            data.append("account_domain_lookup[name]", name);
            data.append("account_domain_lookup[domain]", domain);
            data.append("account_domain_lookup[authentication_provider]", auth);

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    console.log(this.responseText);
                    let responseCode = this.status;
                    resolve("Run status " + responseCode);
                }
            });

            xhr.open("POST", "https://siteadmin.instructure.com/api/v1/account_domain_lookups/");
            xhr.setRequestHeader("Authorization", "Bearer " + token);
            
            xhr.send(data);

        }
       

    })
}