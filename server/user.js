var users=[];

function addUser({id,name,room}){
    name=name.trim().toLowerCase();
    room=room.trim().toLowerCase();
     var existingUser=users.find((user) =>{
         user.room===room && user.name===name
     })

     if(existingUser){
         return {error:"Username already taken"}
     }

     const user={id,name,room}
     users.push(user);

     return {user};
}


function removeUser(id){
    const index=users.findIndex(user => user.id===id)
    if(index!== -1){
        return users.slice(index,index+1)[0];
    }
}

function getUser(id){
    const user=users.find(user => user.id===id)
    return user;
}

function getUserInRoom(room){
    return users.filter(user => user.room===room)
}


module.exports={addUser,removeUser,getUser,getUserInRoom};