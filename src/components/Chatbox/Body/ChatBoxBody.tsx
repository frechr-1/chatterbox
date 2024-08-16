import React, { useState, useEffect } from "react";
import './ChatBoxBody.css'

type ChatBoxBodyProps = {
    imageUrl: string;
    content: string;
    //key: React.Key;
  };
  
  const ChatBoxBody = ({ content, imageUrl  }: ChatBoxBodyProps) => {
    const [isImageExpanded, setIsImageExpanded] = useState(false);
    const [imageSrc, setImageSrc] = useState(imageUrl);
  
    useEffect(() => {
      setImageSrc(imageUrl);
    }, [imageUrl]);
  
    const handleImageClick = () => {
      setIsImageExpanded(!isImageExpanded);
    };
  
    return (
      <main className={"chatbox-body"}>
        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt*/}
        <img
          src={imageSrc}
          alt={"[No image]"} 
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            setImageSrc(`${process.env.PUBLIC_URL}/broken.webp`);
          }}
          className={isImageExpanded ? "expanded" : ""}
          onClick={handleImageClick}
        />
        <p className="chatbox-says">{content}</p>
      </main>
    );
  };

  export default ChatBoxBody;