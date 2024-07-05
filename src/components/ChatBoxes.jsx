import React, { useState, useRef, useEffect } from "react"; // Updated
import fetchChatBoxes from "../MockData.js";

const ChatBoxes = () => {
  const [chatBoxes, setChatBoxes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedChatBoxIndex, setExpandedChatBoxIndex] = useState(false);

  useEffect(() => {
    const loadChatBoxes = async () => {
      try {
        const fetchedChatBoxes = await fetchChatBoxes();
        setChatBoxes(fetchedChatBoxes.chatBoxes);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching chatBoxes:", error);
        setLoading(false);
      }
    };

    loadChatBoxes();
  }, []);

  const toggleComments = (index) => {
    setExpandedChatBoxIndex(expandedChatBoxIndex === index ? null : index);
  };

  return (
    <>
      {loading && <div className="horizontal">Loading...</div>}
      {!loading && (
        <div className="chatbox-list">
          {chatBoxes.map((chatBox, index) => (
            <div key={index} className="chatbox-item">
              <ChatBoxHeader name={chatBox.name} date={chatBox.date} />
              <ChatBoxBody
                imgUrl={chatBox.imageUrl}
                says={chatBox.says}
                comments={chatBox.comments}
                toggleComments={() => toggleComments(index)}
                expanded={expandedChatBoxIndex === index}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const ChatBoxHeader = ({ name, date }) => (
  <div className="chatbox-header">
    <strong>{name}</strong>
    <small>{new Date(date).toLocaleString()}</small>
  </div>
);

const ChatBoxBody = ({ imgUrl, says, comments, toggleComments, expanded }) => {
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [imageSrc, setImageSrc] = useState(imgUrl);
  const commentsRef = useRef(null); // Added

  useEffect(() => { // Added
    if (expanded) {
      commentsRef.current.style.maxHeight = `${commentsRef.current.scrollHeight}px`;
    } else {
      commentsRef.current.style.maxHeight = "0";
    }
  }, [expanded, comments.length]);

  const handleImageClick = () => {
    setIsImageExpanded(!isImageExpanded);
  };

  return (
    <div className={"chatbox-body"}>
      <img
        src={imageSrc}
        alt={says}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          setImageSrc(`${process.env.PUBLIC_URL}/broken.webp`);
        }}
        className={isImageExpanded ? "expanded" : ""}
        onClick={handleImageClick}
      />
      <div className="chatbox-says">
        <p>{says}</p>
        {comments.length > 0 && (
          <p className="toggle-comments" onClick={toggleComments}>
            {`${comments.length} Replies `}
            {expanded ? "[-]" : "[+]"}
          </p>
        )}
      </div>
      <div className={`chatbox-comments ${expanded ? 'expanded' : ''}`} ref={commentsRef}> {/* Updated */}
        {comments.map((comment, index) => (
          <CommentItem
            key={index}
            name={comment.name}
            date={comment.date}
            comment={comment.comment}
          />
        ))}
      </div>
    </div>
  );
};

const ChatBoxComments = ({ comments }) => (
  <div className="chatbox-comments">
    {comments.map((comment, index) => (
      <CommentItem
        key={index}
        name={comment.name}
        date={comment.date}
        comment={comment.comment}
      />
    ))}
  </div>
);

const CommentItem = ({ name, date, comment }) => (
  <div className="comment-item">
    <div className="comment-header">
      <strong>{name}</strong> <small>{new Date(date).toLocaleString()}</small>
    </div>
    <div className="comment-body">
      <p>{comment}</p>
    </div>
  </div>
);

export default ChatBoxes;
