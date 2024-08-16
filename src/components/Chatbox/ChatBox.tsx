import React, { useState, useEffect } from "react";
import { GetChatBox } from "../../api/chatterbox";
import ChatBoxBody from "./Body/ChatBoxBody";
import ChatBoxComments from "./Comments/ChatBoxComments";
import ChatBoxHeader from "./Header/ChatBoxHeader";
import './ChatBox.css'

type ChatBoxProps = {
  chatBox: GetChatBox;
  delay?:number; 
  hideComments?:boolean;
  expandComments?:boolean;
  enterBtn?:boolean;
  replyBtn?:boolean;
};

const ChatBox = ({ chatBox, delay = 0, hideComments = false, expandComments = true, enterBtn = true, replyBtn = false }: ChatBoxProps) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    // Delay adding the "show" class until after the component has mounted
    const timer = setTimeout(() => setVisible(true), delay );
    return () => clearTimeout(timer); 
  }, [delay]);

  return (
    <article className={`chatbox-item ${visible ? 'show' : ''}`}>
      <ChatBoxHeader name={chatBox.name} date={chatBox.date} />
      <ChatBoxBody
        imageUrl={chatBox.imageUrl}
        content={chatBox.content}
      />
      <ChatBoxComments chatBoxId={chatBox.id} hideComments={hideComments} expandComments={expandComments} enterBtn={enterBtn} replyBtn={replyBtn}></ChatBoxComments>
    </article>
  );
};

export default ChatBox;