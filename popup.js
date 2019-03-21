//var
var authToken;
var instName;
var instURL;
var instAuth;
var jsonData = [];

chrome.storage.local.get([])



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
 