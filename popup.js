// global var
var authToken;
var instName;
var instURL;
var instAuth;


function instanceName() {
    instName = document.getElementById("enterName").value;
    instName = instName.trim();
    //console.log(instName);     

}

function instanceURL() {
    instURL = document.getElementById("enterURL").value;
    instURL = instURL.trim();
    instURL = instURL.replace(/^https?:\/\//, ''); //remove domain
    //console.log(instURL);

}

function instanceAuth() {
    instAuth = document.getElementById("enterAuth").value;
    instAuth = instAuth.trim();
    instAuth = instAuth.toLowerCase(); // all auths must be lower case in Siteadmin
    //console.log(instAuth);



}

function successFail(returnStatus) {
    if (returnStatus == "200") {
        alert("successfull");
        document.getElementById("enterName").value = "";
        document.getElementById("enterURL").value = "";
        document.getElementById("enterAuth").value = "";

    }
    if (returnStatus != "200") {
        alert("fail");
    }
    if (returnStatus == 401) {
        alert("unauthorized error returned please check your token.");
    }
    else{
        //do nothing;
        console.log("response status was not anticipated");
    }
}
