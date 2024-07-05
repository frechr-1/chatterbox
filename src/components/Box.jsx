import React, { useState, useRef, useEffect } from "react"; // Updated
import "Box.css";

const Box = ({name, agenda, handleClick})=>{
    return (<>
        <h1>{name}</h1>
        <p>{agenda}</p>
        <a onClick={handleClick}>Enter the box</a>
    </>
    );
}

export default Box;