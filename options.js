document.addEventListener("DOMContentLoaded", function () 
{
  document.getElementById("tokenEnterButton").addEventListener("click", getStore);
});
function getStore()
{
   var tkn= tokenStore.value;
   console.log(tkn);

}