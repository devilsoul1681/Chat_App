import React from "react"
import "./message.css"
import ReactEmoji from "react-emoji"

function Message({message,name}){
     let isSentByUSer=false;
     const trimname=name.trim().toLowerCase();

     if(message.user===trimname){
         isSentByUSer=true;
     }

     return (
         isSentByUSer?(
             <div className="messageContainer justifyEnd">
                 <p className="sentText  pr-10">{trimname}</p>
                 <div className="messageBox backgroundBlue">
                     <p className="messageText colorwhite">{ReactEmoji.emojify(message.text)}</p>
                 </div>
             </div>

         ):(
            <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
                <p className="messageText colorDark">{ReactEmoji.emojify(message.text)}</p>
            </div>
            <p className="sendText pl-10">{message.user}</p>
        </div>
         )
     )
}

export default Message;