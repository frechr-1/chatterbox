import React, { useState, useEffect  } from "react"; // Updated
import useAPI, { 
  GetChatBox,
  GetChatBoxResponse,
} from "../api/chatterbox";
import { useParams } from "react-router-dom"; 
import "./ChatBoxes.css"; 
import ChatBoxForm  from "../components/ChatBoxForm";
import ChatBox from "../components/Chatbox/ChatBox"; 

const ChatBoxes = () => {
  const { boxId } = useParams();
  const [chatBoxes, setChatBoxes] = useState<GetChatBoxResponse>([]);
  const [fetchBoxes, loading, error] = useAPI("ChatBox", "GET", {
    queryParams: `?boxId=${boxId}`,
  });

  const updateView = (newChatBox: GetChatBox) => {
    setChatBoxes((prevChatBoxes) => [newChatBox, ...prevChatBoxes]);
  };  

  useEffect(() => {
    (async () => {
      const result = await fetchBoxes();
      setChatBoxes(
        result
          .sort((a: GetChatBox, b: GetChatBox) => {
            const first = new Date(a.date).getTime() || 0;
            const second = new Date(b.date).getTime() || 0;
            if (first < second) {
              return -1;
            } else if (first === second) {
              return 0;
            } else {
              return 1;
            }
          })
          .reverse()
      );
    })();
  }, []);

  return (
    <>
      <ChatBoxForm boxId={parseInt(boxId || "")} onCreate={updateView} />
      {loading && <div className="horizontal">Loading...</div>}
      {error?.includes("404") && (
        <h3 style={{ textAlign: "center", color: "magenta" }}>
          There are no chatboxes here yet!
        </h3>
      )}
      {!error?.includes("404") && error && (
        <h3 style={{ textAlign: "center", color: "red" }}>
          Something went wrong...
        </h3>
      )}
      {!loading && !error && chatBoxes && (
        <main className="chatbox-list">
          {chatBoxes?.map((chatBox: GetChatBox, index: number) => (
            <ChatBox chatBox={chatBox} delay={index*100+1} key={index} expandComments={false}></ChatBox>
          ))}
        </main>
      )}
    </>
  );
};

export default ChatBoxes;
