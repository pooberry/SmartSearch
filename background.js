var returnStatus;
var authStatus;
//var isThereADuplicate;

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
    return;
  }
  if(duplicateCheck == true)
  {
    checkForDuplicate().then((message)=>{
      
      if(message == true)
      {
        //alert("potential duplicate found ")// switch this with yes no box later. 
        if(window.confirm("A potential duplicate was found. Click OK to proceed anyway "))
        {
          submitRequest();
        }
      }
      if(message == false)
      {
        submitRequest();
      }

    }).catch((message)=>{
      console.log(message);

    })
    

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
  function checkForDuplicate()
  {
    return new Promise(function(resolve, reject)
    {
    var jsonDataArray;
    //var status;

    
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
          console.log(jsonDataArray);

          

          //parse the array
          for(var i=0; i <= jsonDataArray.length; i++)
          {
            if(jsonDataArray[i].name == instName || jsonDataArray[i].domain == instURL)
            {
              resolve(true);
              console.log("Likely duplicate found")
              console.log(jsonDataArray[i].name);
              console.log(jsonDataArray[i].domain);
            }
            else{
              resolve(false);
              console.log("no likely duplicate found")
            }
          }
          reject(Error("something went wrong"))

         
        }

      });

      xhr.open("GET", "https://siteadmin.instructure.com/api/v1/accounts/search?domain=" + instURL);
      xhr.setRequestHeader("Authorization", "Bearer " + token);      

      xhr.send(data);
     

      
      
    })
}
    


      