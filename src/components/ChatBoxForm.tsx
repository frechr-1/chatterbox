import React, { useState } from "react";
import useAPI, { GetChatBox } from "../api/chatterbox";
import './ChatBoxForm.css';

export interface ChatBoxFormProps {
    boxId: number;
    onCreate: (newChatBox: GetChatBox) => void;
  }
  
const ChatBoxForm = ({ boxId, onCreate }: ChatBoxFormProps) => {
    const [name, setName] = useState<string>("User");
    const [imageUrl, setImgUrl] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [success, setSuccess] = useState<boolean | null>(null);
    const [postData, isLoading, error] = useAPI("ChatBox", "POST", {
      body: { name, imageUrl, content, boxId },
    });
  
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      if (name.trim() === "" || content.trim() === "") {
        alert("Please fill out all the required fields.");
        return;
      }
      try {
        const result = await postData(); // Trigger the POST request
        if (result) {
          setSuccess(true);
          onCreate(result as GetChatBox);
        }
      } catch (err) {
        setSuccess(false); 
      }
      setName("");
      setContent("");
      setImgUrl("");
    };
  
    return (
      <>
        <header className="chatbox-creation-header">
          <h3>Create a new chatbox by filling out this form.</h3>
        </header>
        <form onSubmit={handleSubmit}>
          <section className="chatbox-form">
            <article className="chatbox-form-labels">
              <label htmlFor="name">Name (optional)</label>
              <label htmlFor="imageUrl">Image url</label>
              <label htmlFor="content">Content</label>
            </article>
            <main className="chatbox-form-inputs">
              <input
                type="text"
                id="name"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                placeholder="Chatter"
                required
              ></input>
              <input
                type="url"
                id="imageUrl"
                value={imageUrl}
                onChange={(ev) => setImgUrl(ev.target.value)}
                placeholder="ex. domain.com/file.jpg"
              ></input>
              <textarea
                id="content"
                value={content}
                onChange={(ev) => setContent(ev.target.value)}
                required
              ></textarea>
              <button>Create chatbox</button>
            </main>
          </section>
        </form>
      </>
    );
  };

  export default ChatBoxForm;