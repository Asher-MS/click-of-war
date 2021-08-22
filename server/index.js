const express=require('express')
const socketIO=require('socket.io')
const http=require('http')

const port=3000;
let app=express();

let server=http.createServer(app);
let io=socketIO(server,{cors:{origin:"*",methods:["GET","POST"]}});

let points={
    "sampleTeam":10,
    
}

io.on('connection',(socket)=>{
    console.log("new user connected");
    socket.on("new_message",(msg)=>{
        updatePoints(msg);
      
    })
});

server.listen(port,()=>{
    console.log("Listening on port 3000")
});

var updatePoints=function(data){
    
    if(points[data["teamId"]]){
        points[data["teamId"]]=data["noOfClicks"];

    }else{
        points[data["teamId"]]=data["noOfClicks"];

    }


}

setInterval(()=>{
    var max=0;
    var max_scorer;
    for(var i in points){
            if(points[i]>max){
                max=points[i];
            max_scorer=i;
            }
    }
    console.log("HIGHEST SCORER is "+max_scorer+" WITH "+max+" POINTS");
},1000)