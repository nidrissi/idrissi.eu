import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
interface CommentListWrapperProps {
  children: React.ReactNode;
  num?: number;
}

export default function CommentListWrapper({ children, num }: CommentListWrapperProps) {
  return (
    <section className="max-w-lg border-t mt-4">
      <h2
        className="text-xl font-semibold mb-4"
        id="__comments"
      >
        <FontAwesomeIcon icon={faComments} />
        &nbsp;
        Comments
        {num !== undefined && ` [${num}]`}
      </h2>
      {children}
    </section>
  );
}
