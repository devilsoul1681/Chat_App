const express=require("express");
const ap=express();

ap.get('/',function(rq,rs){
    rs.send("Server is running");
})

module.exports=ap
