const express=require("express");
const socketio=require("socket.io");
const http=require("http");
const App=require("./router");
var users=[];

function addUser({id,name,room}){
    name=name.trim().toLowerCase();
    room=room.trim().toLowerCase();
    var existingUser=0
    for(var i=0;i<users.length;i++){
        if(users[i].name===name && users[i].room===room){
            existingUser=1;
        }
    }

     if(existingUser===1){
        const user={id,name,room}
        users.push(user);
         return {error:"Username already taken"}
     }

     const user={id,name,room}
     users.push(user);

     return {user};
}

function removeUser(id){
    const index=users.findIndex(user => user.id===id)
    if(index!== -1){
        return users.splice(index,1)[0];
    }
}

function getUser(id){
    const user=users.find(user => user.id===id)
    return user;
}

function getUserInRoom(room){
    return users.filter(user => user.room===room)
}


const PORT=process.env.PORT ||5000;

const app=express();
/* setting socket.io server */

const server=http.createServer(app);
const io=socketio(server);

io.on("connection",function(socket){
    console.log("We  have a new connection");
    socket.on("join",function(data,callback){
        const value={
            id:socket.id,
            name:data.name,
            room:data.room
        }
        const {error,user}=addUser(value);
        if(error){
            callback(error);
        }
        else{
        socket.emit("message",{user:"Admin",text:user.name+" Welcome to the room "+user.room});
        socket.broadcast.to(user.room).emit("message",{user:"Admin",text:user.name+" has joined the room"})
        socket.join(user.room) 
        io.to(user.room).emit("roomdata",{room:user.room,users:getUserInRoom(user.room)})}
    })

    socket.on("sendmessage",function(message,callback){
        const user=getUser(socket.id);
        io.to(user.room).emit("message",{user:user.name,text:message});
        callback();


    })

    socket.on("disconnect",function(){
        const user=removeUser(socket.id)
        io.to(user.room).emit("message",{user:"admin",text:user.name+" has left"})
        io.to(user.room).emit("roomdata",{room:user.room,users:getUserInRoom(user.room)})
    })
})
 /* */
app.use(App);


server.listen(PORT,function(){
    console.log("server is running on port 5000");
})