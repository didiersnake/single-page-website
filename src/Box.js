import React from "react";

export default function Box(props) {
    const style = {
        background: props.on ? "black" : "gray",
        width: "60px",
        height: "60px",
        "border-radius": "10px" ,
        margin: "10px"

    }
    return (
        //Pass toggle funtion on component click
        //onClick = funtion that computes id of clicked box and implements toggle funtion
        <div id={props.id} onClick={()=>props.toggle(props.id)} style={style}></div>
    )
}