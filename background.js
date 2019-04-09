var returnStatus;
var authStatus;
var isThereADuplicate;

document.addEventListener("DOMContentLoaded", function () 
{
  document.getElementById("swag").addEventListener("click", run);// click the button and have it do crap
});

function run() //run the following functions on button press
{

  instanceURL();
  instanceName();
  instanceAuth();  
  
  if(instName=="" || instURL=="")
  {
    alert("name or URL are not valid");
  }
  if(duplicateCheck == true)
  {
    checkForDuplicate(isThereADuplicate);
    console.log("is there a duplicate " + isThereADuplicate);// going to need to have java wait for the parse the array. And then send the variable

  }
  else{
     
      submitRequest();
  }
  
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
  });// retrive token from options storage

  chrome.storage.local.get(["duplicateValidateOnOff"], function(result)
  {
    duplicateCheck = result.duplicateValidateOnOff;
    console.log(duplicateCheck);
  });// retrive onn off status 1



  function submitRequest()
  {
    
    if(instAuth != "")
    {
      xhrRequestAuth1();
    }
    if(instAuth =="")
    {
      xhrRequestAuth0();
    }

    function xhrRequestAuth1()
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
    function xhrRequestAuth0()
    {
        var data = new FormData();
        data.append("account_domain_lookup[name]", instName);
        data.append("account_domain_lookup[domain]", instURL);
                
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
  }
  function checkForDuplicate(var1)
  {
    var jsonDataArray;
    var status;

    return new Promise(function(resolve, reject)
    {
      //XHR request
      var data = null;
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function (){
        if (this.readyState === 4) 
        {
          //console.log(this.responseText);
          jsonDataArray = JSON.parse(this.responseText)
          status = this.status;

         
        }
      });

      xhr.open("GET", "https://siteadmin.instructure.com/api/v1/accounts/search?domain=" + instURL);
      xhr.setRequestHeader("Authorization", "Bearer " + token);      

      xhr.send(data);

      for(var i = 0; i < jsonDataArray.length; i++ )
      {
        if(jsonDataArray[i].domain == instURL && jsonDataArray[i].name == instName)
        {
          resolve(true);
          var1 = true;
        }
        else{
          reject(false);
          var1 = false;
        }
      }
      
    })
}
    


      