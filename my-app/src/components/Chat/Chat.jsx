import React,{useEffect} from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./chat.css"
import Infobar from "../Infobar/Infobar";
import Input from "../Input/Input"
import Messages from "../Messages/Messages";
import ChatPeople from "../ChatPeople/Chatpeople";

let socket;

function Chat({location}){
     const [info,setinfo]=React.useState({
         username:"",
         room:""
     })
     const [message,setMessage]=React.useState("");
     const [messages,setMessages]=React.useState([]);
     const [people,setpeople]=React.useState([]);
     const [error,seterror]=React.useState(false)
     const Endpoint="localhost:5000";

     useEffect(() =>{
         const {name,room}=queryString.parse(location.search)
         
         socket=io(Endpoint);
         
         setinfo({
             username:name,
             room:room
         })

         socket.emit("join",{name,room},function(data){
                if(data){
                    seterror(true);
                }
         })
        return () =>{
            socket.emit("disconnect")
            socket.off();
        }
     },[Endpoint,location.search])

     useEffect(() =>{
         socket.on("message",function(message){
            setMessages([...messages,message]);
         })
     },[messages])

     useEffect(() =>{
         socket.on("roomdata",function({room,users}){
             setpeople([...people,users])
         })
     },[people])
    
     function change(event){
         setMessage(event.target.value);
     }
     
     function sendMessage(event){
         event.preventDefault();
           if(message){
               socket.emit("sendmessage",message,()=> setMessage(""))      
     }
    }
    
     if(error){
         return (
             <div className="main">
             <h3>Username Already Taken</h3>
             <a href="/">
             <button className="button">Log In Again</button>
             </a>
             </div>
         )
}
else{
    return (
        <div className="outerContainer">
            <div className="container">
            <Infobar room={info.room} />
            <Messages messages={messages} name={info.username} />
            <Input message={message} change={change} sendMessage={sendMessage} />
            </div>
            <ChatPeople user={people} />
        </div>
   );
}
}
export default Chat;