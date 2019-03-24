document.onload
{
  visiallyConfirmTokenStored();
  retriveAuthValidateCheckboxStore();
}
// use button to store token
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("tokenEnterButton").addEventListener("click", tStore);
});
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("enableAuthCheckBox").addEventListener("click", authValidateCheckboxStore);
});// listen for box option 


function tStore()//stores the token in chrome locally
{
   var token2 = document.getElementById("tokenInputBox").value;
     
   chrome.storage.local.set({"token": token2}, function()
   {
     console.log("value is " + token2);
     alert("Token Stored succesfully")
   });

}
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("ClearToken").addEventListener("click", tRemove);

});

function tRemove() //removes the stored token from chrome. 
{
  chrome.storage.local.remove(["token"],function()

  {
    console.log("Token Removed");
    alert("token cleared successfully");
  })
};
function visiallyConfirmTokenStored()// shows if the token is stored
{
  chrome.storage.local.get(["token"], function(result)
  {
    if(result.token != null)
    {
      var removeNoTokenWarning = document.getElementById("storedTokenNo");
      removeNoTokenWarning.style.display="none";
    }
    else{
      var removeTokenPresentMessage = document.getElementById("storedTokenYes");
      removeTokenPresentMessage.style.display="none";
    }
  })
}
function authValidateCheckboxStore()
{
  var authValidateBoxStatus = document.getElementById("enableAuthCheckBox").checked;
  

  chrome.storage.local.set({"authValidateOnOff": authValidateBoxStatus}, function()
{
  console.log("auth check " +  authValidateBoxStatus);

});
  
}// store box option. 

function retriveAuthValidateCheckboxStore()
{
  chrome.storage.local.get("authValidateOnOff", function(result)
  {
    document.getElementById("enableAuthCheckBox").checked = result.authValidateOnOff;
  })
}
