import React from "react";
import {Link} from "react-router-dom";
import "./join.css"

function Join(){
    const [info,setinfo]=React.useState({
        username:"",
        room:""
    })

    function change(event){
        const {name,value}=event.target
        setinfo(prevalue =>{
            return{
                ...prevalue,
                [name]:value
            }
        })
    }

    function check(event){
       if(!info.username || !info.room){
          return event.preventDefault()
       }
       else{
            return null
       }
    }





    return(
        <div className="main">
        <h3>Account Login</h3>
        <input className="input" name="username" type="text" placeholder="Username" value={info.name} onChange={change} autoComplete="off" />
        <input className="input" name="room" type="text" placeholder="Room" value={info.room} onChange={change} autoComplete="off" />
        <Link to={'/chat?name='+info.username+'&room='+info.room} onClick={check}>
        <button className="button" type="submit">Sign In</button>
        </Link>
      </div>
    );
}

export default Join;