var CSVFile;
var CSVName;
var CSVDomain;
var CSVAuth;




getChromeVariables();

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("submitFile").addEventListener("click", Run2);
}); //event listiner for form submission. 

function Run2() {
 DrMoo();
    



}

function getChromeVariables() {

    chrome.storage.local.get(["token"], function (result) {
        token = result.token;
    })
    chrome.storage.local.get(["duplicateValidateOnOff"], function (result) {
        duplicateCheckCSV = result.duplicateValidateOnOff;

    });
}



async function DrMoo(){
    FileStore();
    const array1 = await FileParse();
    for(let elm1 of array1)
    {
        

        let csvLineName = elm1.name;
        let csvLineDomain = elm1.domain;
        let csvLineAuth = elm1.auth;
        console.log(csvLineName + csvLineDomain + csvLineAuth);

        let array2 =  await XHRRequestDuplicate(csvLineDomain);
        for(let elm2 of array2)
        {
            let duplicateLineName = elm2.name;
            let duplicateLineDomain = elm2.domain;
            let duplicateLineAuth = elm2.auth;

            console.log("dupecall" + duplicateLineName + duplicateLineDomain + duplicateLineAuth);
        }
        


    }
                
            
        
    }
    
    
     



function FileStore() {
    CSVFile = document.getElementById("file").files[0];
    console.log(CSVFile.name);

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


    function XHRRequestDuplicate(domain) {
        return new Promise(function(resolve, reject){
            console.log("running...")
            console.log(domain);

            var data = new FormData();
            
            
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            
            xhr.addEventListener("readystatechange", function () {
              if (this.readyState === 4) {
                console.log(this.responseText);
                console.log(this.status);
                if(this.status == 200)
                {
                    let duplicateFindArray = JSON.parse(this.responseText);
                resolve(duplicateFindArray);

                }
                if(this.status != 200)
                {
                    console.log("call not successfull");
                    reject("call not successfull");
                }
                
              }
            });

            
            xhr.open("GET", "https://siteadmin.instructure.com/api/v1/accounts/search?domain=" + domain);
            xhr.setRequestHeader("Authorization", "Bearer " + token);
            
            
            xhr.send(data);
           
            
        })
             
     
     
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
        function duplicateHandle(){
            var comparteName;
            var compare
            return new Promise(function(resolve,reject){


            })
        
        }

    


}