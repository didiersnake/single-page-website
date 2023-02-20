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
        <div id={props.id} onClick={()=>props.toggle(props.id)} style={style}></div>
    )
}