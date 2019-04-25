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
    SubmitCSVFile();


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

function SubmitCSVFile() {
    FileParse().then((data1) => {
        let dataArray = data1;
        // parse the array
        for (let i = 0; i < dataArray.length; i++) {
            // parse the array
            CSVName = dataArray.data[i].name;
            CSVDomain = dataArray.data[i].domain;
            CSVAuth = dataArray.data[i].auth;
            
            if(duplicateCheckCSV == true)
            {
                XHRRequestDuplicate(CSVName, CSVDomain).then((TF)=>{
                    

                    if(TF = true){
                          if (window.confirm("OK to process cancel to skip line " + "\nID:" + duplicateInstanceID + "\nName:" + duplicateInstanceName + "\nDomain:" + duplicateInstanceURL)) {
                              XHRRequestFire(CSVName, CSVDomain, CSVAuth);
                          } else {
                              //any needed exit logic
                          }
                    }
                    if( TF = false){
                       XHRRequestFire(CSVName, CSVDomain, CSVAuth);
                    }
                  
                })
            }
            else{
                
                XHRRequestFire(CSVName, CSVDomain, CSVAuth);
            }


        }
    })
}

function XHRRequestDuplicate(name, domain)
{
    return new Promise(function(resolve, reject){
        var data = new FormData();
        data.append("domain", domain);

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
                let duplicateDataArray = JSON.parse(this.responseText);
                // parse the existing entries
                for(let i = 0; i < duplicateDataArray.length; i++)
                {
                    if(duplicateDataArray[i].name == name || duplicateDataArray[i].domain == domain){
                        duplicateInstanceID = duplicateDataArray[i].id;
                        duplicateInstanceName = duplicateDataArray[i].name;
                        duplicateInstanceURL = duplicateDataArray[i].domain;
                        resolve(true);

                    }
                    if(duplicateDataArray.length == 0 || duplicateDataArray.length==undefined)
                    {
                        
                         resolve(false);                   
                       
                    }
                    else{
                        reject("neither condition met");
                    }
                }
            }
        });

        xhr.open("GET", "https://siteadmin.instructure.com/api/v1/accounts/search");
        xhr.setRequestHeader("Authorization", "Bearer " + token);
        
    })


}
function XHRRequestFire(name, domain, auth)
{
    if(auth == "" || auth == null || auth == undefined || auth == "null")
    {
        var data = new FormData();
        data.append("account_domain_lookup[name]", name);
        data.append("account_domain_lookup[domain]", domain);

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
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
            }
        });

        xhr.open("POST", "https://siteadmin.instructure.com/api/v1/account_domain_lookups/");
        xhr.setRequestHeader("Authorization", "Bearer " + token);
        
        xhr.send(data);
    }


}
