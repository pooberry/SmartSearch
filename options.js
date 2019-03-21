document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("tokenEnterButton").addEventListener("click", tStore);
});

function tStore()
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

function tRemove()
{
  chrome.storage.local.remove(["token"],function()

  {
    console.log("Token Removed");
    alert("token cleared successfully");
  })
};
