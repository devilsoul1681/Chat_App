import React from "react";
import "./input.css"

function Input({message,change,sendMessage}){
    return (
        <form className="form">
            <input className="ininput" type="text" placeholder="Type the text here"
            value={message} onChange={change} onKeyPress={event =>event.key==="Enter" ? sendMessage(event):null}>
            </input>
            <button className="sendButton" onClick={event =>sendMessage(event)}>
             Send
            </button>
        </form>
    )
}

export default Input