import React, { useState, useRef, useEffect } from "react"; // Updated
import "./Box.css";

export interface GetBoxResponse {
    id: number;
    boxName: string;
    agenda: string;
  } 

interface BoxProps {
  data: GetBoxResponse;
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