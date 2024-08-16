import React from "react";
import './CommentItem.css'

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

export default CommentItem;