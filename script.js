let http = require("http");
let url = require('url');
let fs = require('fs');
const { json } = require("stream/consumers");
let server = http.createServer((req,res)=>{
    let pasre_url = url.parse(req.url,true);
    if(pasre_url.pathname == "/products"){
        fs.readFile("./data.json","utf-8",(err,data)=>{
            // console.log((JSON.parse(data)));
            sorted_data = JSON.parse(data).sort((a,b)=> b.rating.rate - a.rating.rate);
            console.log(sorted_data);
            if(sorted_data){
                res.write(JSON.stringify(sorted_data));
                res.end();
            }
            else{
                res.write("error infetching file");
                res.end();
            }
        })
       
    }
    else{
        res.write("file not found");
    }
})
let port = 3001;
server.listen(port,()=>{
    console.log("server has started "+`http://localhost:${port}`);
})