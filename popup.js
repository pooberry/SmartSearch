//var
var authToken;
var instName;
var instURL;
var instAuth;
var jsonData = [];



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