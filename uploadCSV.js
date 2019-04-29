var CSVFile;
var CSVName;
var CSVDomain;
var CSVAuth;
var CSVduplicateInstanceID;
var CSVduplicateInstanceName;
var CSVduplicateInstanceURL;



getChromeVariables();

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("submitFile").addEventListener("click", Run2);
}); //event listiner for form submission. 

function Run2() {
    FileStore();
    //SubmitCSVFile();
    duplicateHandler();



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
            complete: function (results) {
                var CSVInfo = results.data;
                //chrome.storage.local.set({'infoList':CSVInfo.data}, function(){});
                resolve(CSVInfo);
            }

        });
    })

}

/*function SubmitCSVFile() {
    FileParse().then((data1) => {
        let dataArray = data1;
        console.log(dataArray);
        //closure parse loop

        
        
            for (var i = 0; i < dataArray.length; i++) {
                (function (i) {
                    let name = dataArray[i].name;
                    let domain = dataArray[i].domain;
                    let auth = dataArray[i].auth;
                    XHRRequestFire(name, domain, auth);
                })(i);
            }
                




    })
}*/

function duplicateHandler()
{
    FileParse().then((data2)=>{
        for(var i = 0; i< data2.length; i++){
            (function (i){
                var name2 = data2[i].name;
                var domain2 = data2[i].domain;
                var auth2 = data2[i].auth;

                XHRRequestDuplicate(name2, domain2).then((data3)=>{
                    if(data3[i].name == data2[i].name || data3[i].domain == data2[i].domain)
                    {
                        alert("duplicate found");
                    }
                    else{
                        XHRRequestFire(name2, domain2, auth2);
                    }
                    
                })
            })(i)
        }
    })
    console.log(CSV)
    function XHRRequestDuplicate(name, domain) {
        return new Promise(function(resolve, reject){
         var data = new FormData();
             data.append("domain", domain);
     
             var xhr = new XMLHttpRequest();
             xhr.withCredentials = true;
     
             xhr.addEventListener("readystatechange", function () {
                 if (this.readyState === 4) {
                     console.log(this.responseText);
                     let duplicateDataArray = JSON.parse(this.responseText);
                     if(this.status == 200){
                         resolve(duplicateDataArray);
                     }
                     else{
                         reject(duplicateDataArray);
                     }
                 }
             });
     
             xhr.open("GET", "https://siteadmin.instructure.com/api/v1/accounts/search");
             xhr.setRequestHeader("Authorization", "Bearer " + token);
        })
             
     
     
     }
     
}

function XHRRequestFire(name, domain, auth) {
    
        if (auth == "" || auth == null || auth == undefined || auth == "null") {
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
        } else {
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