//var
var authToken;
var instName;
var instURL;
var instAuth;
var jsonData = [];

chrome.storage.sync.get(["token"], function(result)
{
     authToken = result.token;
     console.log(authToken);

});


// action 
document.addEventListener("DOMContentLoaded", function()
{
    document.getElementById("swag").addEventListener("click", run);
});


function run()
{
    //getToken();
    instanceURL();
    instanceName();
    instanceAuth();
    //makeRequest();
    xhrRequest();
    
    
    
}

    function getToken() 
    {
        
        {
            token = document.getElementById("enterToken").value;
            console.log(token);
        }
        
    }
    function instanceName()
    {
        instName = document.getElementById("enterName").value;
        console.log(instName);     
         
    }
    function instanceURL()
    {
        instURL = document.getElementById("enterURL").value;
        console.log(instURL);
    }
    function instanceAuth()
    {
        instAuth = document.getElementById("enterAuth").value;
        console.log(instAuth);
        
    }
    function makeRequest()
    {
        $.ajax({
            url: "https://siteadmin.instructure.com/api/v1/account_domain_lookups/?" + "account_domain_lookup[name]=" + instName + "&account_domain_lookup[domain]=" + instURL + "&account_domain_lookup[authentication_provider]=" + instAuth,
            //data: "account_domain_lookup[name]=" + instName + "account_domain_lookup[domain]=" + instURL + "account_domain_lookup[authentication_provider]=" + instAuth,
            type: "options",
            dataType: "json",
            crossDomain: true,
            headers:
            {
                "Authorization": "Bearer " + authToken,
                
            },
            
            beforeSend: function(xhr)
            {
                //xhr.setRequestHeader("Authorization", "Bearer " + token);

                
            },
            success: function(response)
            {
                jsonData = response;
                console.log(jsonData);
            }
        });

        
    }
    function xhrRequest()
    {
        var data = new FormData();
        data.append("account_domain_lookup[name]", instName);
        data.append("account_domain_lookup[domain]", instURL);
        data.append("account_domain_lookup[authentication_provider]", instAuth);
        
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        
        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
            console.log(this.responseText);
          }
        });
        
        xhr.open("POST", window.location.hostname + "/api/v1/account_domain_lookups/");
        xhr.setRequestHeader("Authorization", "Bearer "+ authToken);
        xhr.setRequestHeader("cache-control", "no-cache");
        xhr.setRequestHeader("Postman-Token", "248a97f7-b9e9-4b9a-88f7-1ba23e36d20a");
        
        xhr.send(data);
    }