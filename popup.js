//var
var authToken;
var instName;
var instURL;
var instAuth;




    function instanceName()
    {
        instName = document.getElementById("enterName").value;
        instName = instName.trim();
        console.log(instName);     
         
    }
    function instanceURL()
    {
        instURL = document.getElementById("enterURL").value;
        instURL = instURL.trim();
        console.log(instURL);
    }
   
    function instanceAuth()
    {
        instAuth = document.getElementById("enterAuth").value;
        instAuth = instAuth.trim();
        instAuth = instAuth.toLowerCase(); // all auths must be lower case in Siteadmin
        console.log(instAuth);
        
            
        
    }
    function successFail(returnStatus)
    {
        if(returnStatus == "200")
        {
            alert("successfull");
        }
        if(returnStatus == null)
        {
            //do nothing
        }
        if(returnStatus != "200")
        {
            alert("fail");
        }
    }