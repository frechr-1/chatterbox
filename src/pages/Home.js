
 
import { useEffect, useState } from "react";
import Box from "../components/Box.jsx";
import api from "../api/chatterbox.js";

import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [boxes, setBoxes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(()=>{
    fetch(boxesURL).then((result)=>{
      setBoxes(result.data);
      setIsLoading(false);
    });
  },[]);

  const goToBox = (id)=>{
    navigate(`/box/${id}`);
  }

  return (
    <>
      {isLoading && <p>Loading</p>}
      {!isLoading && !boxes && <p>No boxes found!</p>}
      {boxes.map((box) => {
        <Box name={box.name} agenda={box.agenda} handleClick={()=>goToBox(box.id)}></Box>
      })}
    </>
  );
}

export default Home;
