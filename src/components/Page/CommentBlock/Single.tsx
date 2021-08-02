import React from "react";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import ReactMarkdown from "react-markdown";
import remarkExternalLinks from "remark-external-links";

import Identicon from "./Identicon";

export interface Comment {
  id: string;
  pageId: string;
  timestamp: number;
  content: string;
  authorId: string;
  authorName: string;
}

interface SingleProps {
  comment: Comment;
}

export default function Single({ comment }: SingleProps) {
  const date = new Date(comment.timestamp);

  return (
    <div className="flex items-start">
      <div className="mr-2">
        <Identicon size={36} seed={comment.authorId} />
      </div>
      <div>
        <div>
          <p className="leading-none border-b pb-1 border-opacity-50 border-dashed">
            <strong>
              {comment.authorName}
            </strong>
            {", "}
            <em>
              {date.toLocaleString()}
            </em>
          </p>
        </div>
        <ReactMarkdown
          remarkPlugins={[remarkMath, remarkExternalLinks]}
          rehypePlugins={[rehypeKatex]}
          children={comment.content} />
      </div>
    </div>
  );
}
