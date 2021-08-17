import React from "react";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import ReactMarkdown from "react-markdown";
import remarkExternalLinks from "remark-external-links";

import Identicon from "./Identicon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faEraser, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ClientPrincipal } from "./ClientPrincipal";

import * as styles from "./Single.module.css";

export interface Comment {
  id: string;
  pageId: string;
  timestamp: number;
  content: string;
  deleted: boolean;
  userId: string;
  userName: string;
}

interface SingleProps {
  client?: ClientPrincipal;
  comment: Comment;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

export default function Single({ client, comment, setComments }: SingleProps) {
  const date = new Date(comment.timestamp);

  const onClickDelete = async (superDelete?: boolean) => {
    if (
      window.confirm(
        `Are you sure that you want to${
          superDelete ? " **TRULY** " : " "
        }delete this comment?`
      )
    ) {
      try {
        const response = await fetch(
          `/api/comment/${comment.pageId}/${comment.id}${
            superDelete ? "?super=1" : ""
          }`,
          { method: "DELETE" }
        );
        if (response.ok) {
          if (superDelete) {
            setComments((list) =>
              list.filter((curr) => curr.id !== comment.id)
            );
          } else {
            setComments((list) =>
              list.map((c) =>
                c.id === comment.id ? { ...c, deleted: true } : c
              )
            );
          }
        } else {
          throw new Error();
        }
      } catch {
        alert("Error deleting comment!");
      }
    }
  };

  return (
    <article className={styles.comment} data-deleted={comment.deleted}>
      <aside>
        {comment.deleted ? (
          <FontAwesomeIcon
            size="2x"
            icon={faBan}
            title="This comment has been deleted."
          />
        ) : (
          <Identicon size={36} seed={comment.userId} />
        )}
      </aside>
      <header>
        <div>
          <strong>{comment.userName}</strong>
          {", "}
          <em>{date.toLocaleString()}</em>
        </div>
        {comment.userId === client?.userId && !comment.deleted && (
          <button onClick={() => onClickDelete()} title="Delete this comment">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
        {client?.userRoles.includes("administrator") && (
          <button
            onClick={() => onClickDelete(true)}
            title="Delete this comment **for real**."
          >
            <FontAwesomeIcon icon={faEraser} />
          </button>
        )}
      </header>
      <div className="prose">
        <ReactMarkdown
          remarkPlugins={[remarkMath, remarkExternalLinks]}
          rehypePlugins={[rehypeKatex]}
          children={comment.content ?? "*[deleted]*"}
        />
      </div>
    </article>
  );
}
