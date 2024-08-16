import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAPI, {
  GetBoxCommentResponse,
  GetBoxComment,
} from "../../../api/chatterbox";
import CommentItem from "./CommentItem/CommentItem";
import "./ChatBoxComments.css";

type ChatBoxCommentProps = {
  chatBoxId: number;
  hideComments?: boolean;
  expandComments?: boolean;
  enterBtn?: boolean;
  replyBtn?: boolean;
};

const ChatBoxComments = ({
  chatBoxId,
  hideComments,
  expandComments,
  enterBtn,
  replyBtn,
}: ChatBoxCommentProps) => {
  const { boxId } = useParams();
  const [commentToggle, setCommentToggle] = useState<boolean>(
    expandComments || false
  );
  const [comments, setComments] = useState<GetBoxCommentResponse | null>(null);
  const [fetchComments, loading, error] = useAPI("BoxComment", "GET", {
    queryParams: `?chatBoxId=${chatBoxId}`,
  });

  const [newName, setNewName] = useState("");
  const [newImgUrl, setNewImgUrl] = useState("");
  const [newContent, setNewContent] = useState("");

  const navigate = useNavigate();
  const commentsRef = useRef<HTMLDivElement>(null);
  const goToChatBox = () => {
    navigate(`/box/${boxId}/chatbox/${chatBoxId}`);
  };
  const postComment = () => {};
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

  const setState =
    (name: string) => (ev: React.FormEvent<HTMLInputElement>) => {
      const value = ev.currentTarget.value;
      alert("sentry ahead!")
      switch (name) {
        case "name":
          setNewName(value);
          break;
        case "imgUrl":
          setNewImgUrl(value);
          break;
        case "content":
          setNewContent(value);
          break;
        default:
          break;
      }
    };

  return (
    <section>
      <hr></hr>
      <section
        className={`reply-section ${
          comments && comments.length !== 0 ? "padded" : ""
        }`}
      >
        {comments && comments.length > 0 && (
          <p
            className="toggle-comments"
            onClick={() => setCommentToggle(!commentToggle)}
          >
            {`${comments.length} ${comments.length > 1 ? "Replies" : "Reply"} `}
            {commentToggle ? "[-]" : "[+]"}&nbsp;
          </p>
        )}
        {enterBtn && (
          <span className="enter-btn">
            &nbsp;
            <button
              onClick={() => {
                goToChatBox();
              }}
            >
              Enter Chatbox
            </button>
          </span>
        )}
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
      {replyBtn && (
        <div className="form-and-btn">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              postComment();
            }}
            className="reply-form"
          >
            <div className="reply-form-labels">
              <label htmlFor="name">Name: </label>
              <label htmlFor="imgUrl">Image (optional): </label>
              <label htmlFor="content">Content: </label>
            </div>
            <div className="reply-form-inputs">
              <input id="name" onChange={setState("name")}></input>
              <input
                id="imgUrl"
                type="url"
                onChange={setState("imgUrl")}
              ></input>
              <textarea id="content" onChange={setState("name")}></textarea>
            </div>
          </form>
          <span className="reply-form-btn">
            &nbsp;
            <button type="submit">Create Reply</button>
          </span>
        </div>
      )}
    </section>
  );
};

export default ChatBoxComments;
