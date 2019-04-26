var CSVFile;
var CSVName;
var CSVDomain;
var CSVAuth;


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
    return new Promise(function (resolve) {
        Papa.parse(CSVFile, {
            header: true,
            dynamicTyping: true,
            complete: function(results) {
              var CSVInfo = results.data;
              //chrome.storage.local.set({'infoList':CSVInfo.data}, function(){});
              resolve(CSVInfo);           



            }

        });
    })

}

function SubmitCSVFile() {
    FileParse().then((data1) => {
        let dataArray = data1;
        console.log(dataArray);
        //closure parse loop
        
            for (var i = 0; i < dataArray.length; i++) {
                (function(i) {
                  let name = dataArray[i].name;
                  let domain = dataArray[i].domain;
                  let auth = dataArray[i].auth;
                  XHRRequestFire(name, domain, auth);
                })(i);
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
