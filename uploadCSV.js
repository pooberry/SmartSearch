var CSVFile;
//var parsedResults;

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("submitFile").addEventListener("click", Run2);
});



function Run2() {
    FileStore();
    FileParse().then((message) =>{
        let data = message;
        console.log(data.data);
        for(var i = 0; i < data.data.length; i++)
        {
            console.log("name " + data.data[i].name);
        }
        
       
    }).catch((message) => {
        let data = message
        console.log(data);
    })
}

function FileStore() {
    CSVFile = document.getElementById("file").files[0];
    console.log(CSVFile.name);

}

function FileParse() {
    return new Promise(function (resolve, reject){
        Papa.parse(CSVFile, {
            header: true,
            dynamicTyping: true,
            complete: function (results) {
                //parsedResults = results;
                //console.log(results);
                if(results.length != 0 || results.length !=undefined){
                    resolve(results);
                }
                else{
                    reject(error("CSV was not able to be parsed correctly"));
                }

                
    
            }
    
        });
    })
    
}