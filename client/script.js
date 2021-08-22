var canvas=document.getElementById("mycanvas");

var noOfClicks=0;
var teamId="";
var clickField=document.getElementById("click_counter");
var handleClick=function(){
    noOfClicks=noOfClicks+1;
    clickField.innerHTML="No of Clicks : "+noOfClicks;
    
    

}

canvas.addEventListener("click",handleClick);

var teamIdField=document.getElementById("teamid");
var updateIdField=function(){
    if(teamId==""){
        teamIdField.innerHTML=`
        <h3 style="text-align:center">Input Team ID</h3>
        <input type="text" id="teamidinput">
        <button id="enterbutton">Enter</button>
        `;
    }else{
        teamIdField.innerHTML=`
        <h3>Team ID=`+teamId+`</h3>
        `;
    }
}
updateIdField();

document.getElementById("enterbutton").addEventListener("click",()=>{
    var teamIdInput=document.getElementById("teamidinput");

    teamId=teamIdInput.value;
    updateIdField();

});


var socket = io('http://192.168.1.4:3000');
socket.on('connect',function(){
    console.log("COnnected to server");
})
setInterval(()=>{
   if(teamId){
    var data={"teamId":teamId,"noOfClicks":noOfClicks};
    socket.emit("new_message",data);
   }else{

   }
},100);