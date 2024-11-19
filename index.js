let http = require("http");
let url = require('url');
let server = http.createServer(async(req,res)=>{
    let parsed_data = url.parse(req.url,true);
    console.log(parsed_data);
    if(parsed_data.pathname.split('/')[1]=="products"){
        let param_data = parsed_data.pathname.split('/').pop();
        let dta = await fetch("https://fakestoreapi.com/products");
        let api_data = await dta.json();
        const filter_data = api_data.filter((element)=>{
            return element.id == param_data;
        })
        if(filter_data.length>0){
            res.write(JSON.stringify(filter_data[0]));
            res.end();
        }
        else{
            res.write("data not available");
            res.end();
        }
        
    }
    else{
        res.write("not found or enter only /products");
        res.end();
    }
    
})
let port = 3000;
server.listen(port,()=>{
    console.log("server has started "+`http://localhost:${port}`);
})