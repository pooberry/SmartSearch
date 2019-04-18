document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("submitFile").addEventListener("click", FileStore);
  });

  function FileStore()
  {
      const CSVFile = document.getElementById("file").files[0];
      console.log(CSVFile.name);
      window.close();

  }