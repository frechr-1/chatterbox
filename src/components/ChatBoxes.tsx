import React, { useState, useRef, useEffect  } from "react"; // Updated
import useAPI, {
  GetBoxComment,
  GetBoxCommentResponse,
  GetChatBox,
  GetChatBoxResponse,
} from "../api/chatterbox";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./ChatBoxes.css"; 

interface ChatBoxFormProps {
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

type CommentToggleState = { [n: number]: boolean | null };

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
            <ChatBox chatBox={chatBox} delay={index*100+1} key={index}></ChatBox>
          ))}
        </main>
      )}
    </>
  );
};

type ChatBoxProps = {
  chatBox: GetChatBox;
  delay?:number; 
};

const ChatBox = ({ chatBox, delay = 0  }: ChatBoxProps) => {
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
      <ChatBoxComments chatBoxId={chatBox.id}></ChatBoxComments>
    </article>
  );
};

type ChatBoxHeaderProps = { name: string; date: string };

const ChatBoxHeader = ({ name, date }: ChatBoxHeaderProps) => (
  <header className="chatbox-header">
    <strong>{name}</strong>
    <small>{new Date(date).toLocaleString()}</small>
  </header>
);

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

type ChatBoxCommentProps = {
  chatBoxId: number;
};

const ChatBoxComments = ({ chatBoxId }: ChatBoxCommentProps) => {
  const { boxId } = useParams();  
  const [commentToggle, setCommentToggle] = useState<boolean>(false);
  const [comments, setComments] = useState<GetBoxCommentResponse | null>(null);
  const [fetchComments, loading, error] = useAPI("BoxComment", "GET", {
    queryParams: `?chatBoxId=${chatBoxId}`,
  });
  const navigate = useNavigate();
  const commentsRef = useRef<HTMLDivElement>(null);
  const goToChatBox = () => {
    //navigate(`/box/${boxId}/chatbox/${chatBoxId}`);
  }
  useEffect(() => {
    (async () => {
      const refCurrent = commentsRef.current;
      if (!comments) {
        const result = await fetchComments();
        setComments(result);
      }
      if (!error && refCurrent != null) {
        if (commentToggle && refCurrent.style) {
          refCurrent.style.maxHeight = `${refCurrent.scrollHeight}px`;
        } else {
          refCurrent.style.maxHeight = "0px";
        }
      }
    })();
  }, [commentToggle]);

  return (
    <section>
      <hr></hr>
      <section className={`reply-section ${comments && comments.length !== 0 ? 'padded' : ''}`}>

        {comments && comments.length > 0 && (
          <p
            className="toggle-comments"
            onClick={() => setCommentToggle(!commentToggle)}
          >
            {`${comments.length} ${comments.length > 1 ? "Replies" : "Reply"} `}
            {commentToggle ? "[-]" : "[+]"}&nbsp;
            {comments && comments.length !== 0 && " ~ "} 
          </p>
        )}
        <span>&nbsp;<button onClick={()=>{
          
          goToChatBox();
        }}>Enter Chatbox</button></span>
      </section>
      <main
        className={`chatbox-comments ${commentToggle ? "expanded" : ""}`}
        ref={commentsRef}
      >
        {comments?.map((comment: GetBoxComment, index: number) => (
          <CommentItem
            key={index}
            name={comment.name}
            date={comment.date}
            comment={comment.content}
          />
        ))}
      </main> 
    </section>
  );
};

type CommentItemProps = { name: string; date: string; comment: string };

const CommentItem = ({ name, date, comment }: CommentItemProps) => (
  <article className="comment-item">
    <header className="comment-header">
      <strong>{name}</strong> <small>{new Date(date).toLocaleString()}</small>
    </header>
    <main className="comment-body">
      <p>{comment}</p>
    </main>
  </article>
);

export default ChatBoxes;
