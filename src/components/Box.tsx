import React from "react"; 
import "./Box.css";
import { GetBox } from "../api/chatterbox";

interface BoxProps {
  data: GetBox;
  handleClick: (id: number) => void;
}

export const Box = ({data, handleClick}:BoxProps) => {
    return (
    <div className="box">
        <h3 className="box-name">{data.boxName}</h3>
        <p>{data.agenda}</p>
        <button onClick={()=>handleClick(data.id)}>Enter the box</button>
    </div>
    );
};

export default Box;