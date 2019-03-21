var returnStatus;

document.addEventListener("DOMContentLoaded", function () 
{
  document.getElementById("swag").addEventListener("click", run);// click the button and have it do crap
});
function run() //run the following functions on button press
{
  //getToken();
  instanceURL();
  instanceName();
  instanceAuth();
  //makeRequest();//if using JQuery use this
  xhrRequest();

}

console.log("loaded background");
var jsonData = [];

chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'siteadmin.instructure.com'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });// make sure the page is a siteadmin page

  chrome.storage.local.get(["token"], function(result)
  {
    token=result.token;
  })// retrive token from options storage
      

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
            returnStatus = this.status;
            console.log(returnStatus);
            successFail(returnStatus);
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