const app = require('express')(),
      fs = require('fs');

const step = require('./Step.js');

app.get('/',(req,res)=>{
	res.sendFile(__dirname+'/index.html');
});

app.get('/punit',function(req,res){

    Promise.all([
    readFile('./MoveCellVar1TempSB.xml'),
    readFile('./IOMap.json')
    ]).then((files) => {
        let newStep = new step(...files);
        let OutputXML = newStep.stateGenerator();
        res.send(OutputXML);
        })
        .catch((error) => console.log(error))
});

app.listen(8080,()=>console.log("Listening to port 8080"));

function readFile(url){
    return promise = new Promise((resolve,reject) => {
        fs.readFile(url,"utf8", (err, data) => {
            if(err)
                reject(err);
            else
                resolve(data);
        })
    })
}