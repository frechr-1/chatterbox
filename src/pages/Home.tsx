 import React, {useEffect, useState} from "react"; 
import  {useAPI, GetBoxResponse} from "../api/chatterbox";
import Box from '../components/Box';
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [boxes, setBoxes] = useState<GetBoxResponse >([]);
  const [fetchBoxes, loading, error] = useAPI("Box","GET");
  const navigate = useNavigate();

  const goToBox = (id: number) => {
    navigate(`/box/${id}`);
  };

  useEffect(()=>{
    (async()=>{
      const result = await fetchBoxes();
      console.log(result);
      setBoxes(result);
    })()
  },[]);

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>Error!</div>}
      {boxes &&
      <div className="box-container">
        {boxes.map((box, index) => <Box data={box} handleClick={goToBox} key={index}></Box>)}
      </div>
      }
    </>
  );
};

export default Home;