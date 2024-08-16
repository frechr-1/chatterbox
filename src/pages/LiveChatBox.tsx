import React, { useEffect, useState } from "react"; 
import useAPI, { GetChatBox  } from "../api/chatterbox";
import { useParams } from "react-router-dom";
import ChatBox from "../components/Chatbox/ChatBox";

const LiveChatBox = () => {
    const {chatboxId} = useParams();
    const [fetchData, loading, error ] = useAPI("ChatBox", "GET", {queryParams:`/${chatboxId}`})
    const [chatBox, setChatBox] = useState<GetChatBox>();

    useEffect(()=>{
        const fetch = async () => {
            const result = await fetchData();
            setChatBox(result as any); 
        };
        fetch();
    }, [chatboxId]);
    return (<> 
        { !chatBox && loading && !error && <p> loading...</p> }
        {error && !loading && !chatBox && <p> Error!</p> }
        {chatBox && !error && !loading && <>
            <ChatBox chatBox={chatBox} expandComments={true} enterBtn={false} replyBtn={true}></ChatBox>
            </>}
    </>);
}

export default LiveChatBox;