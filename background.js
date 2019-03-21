document.addEventListener("DOMContentLoaded", function () 
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

console.log("loaded");
var jsonData = [];

chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'siteadmin.instructure.com'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
  chrome.storage.local.get(["token"], function(result)
  {
    token=result.token;
  })
      

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
        
        xhr.open("POST", "https://siteadmin.instructure.com/api/v1/account_domain_lookups/");
        xhr.setRequestHeader("Authorization", "Bearer "+ token);
        
        
        
        xhr.send(data);
    }
      
     /*function makeRequest() {
       $.ajax({
         url: "https://siteadmin.instructure.com/api/v1/account_domain_lookups/?" + "account_domain_lookup[name]=" + instName + "&account_domain_lookup[domain]=" + instURL + "&account_domain_lookup[authentication_provider]=" + instAuth,
         //data: "account_domain_lookup[name]=" + instName + "account_domain_lookup[domain]=" + instURL + "account_domain_lookup[authentication_provider]=" + instAuth,
         type: "options",
         dataType: "json",
         crossDomain: true,
         headers: {
           "Authorization": "Bearer " + token,

         },

         
         },
         success: function (response) {
           jsonData = response;
           console.log(jsonData);
         }
       });


     }*/ //if for whatever reason jQueary becomes needed for the code block we can use this. 