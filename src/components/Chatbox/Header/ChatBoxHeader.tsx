import React from "react";
import './ChatBoxHeader.css'

type ChatBoxHeaderProps = { name: string; date: string };

const ChatBoxHeader = ({ name, date }: ChatBoxHeaderProps) => (
  <header className="chatbox-header">
    <strong>{name}</strong>
    <small>{new Date(date).toLocaleString()}</small>
  </header>
);

export default ChatBoxHeader;