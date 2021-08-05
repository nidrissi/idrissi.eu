import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { ClientPrincipal } from "./ClientPrincipal";
import UserDetails from "./UserDetails";

interface NewCommentProps {
  client: ClientPrincipal;
  setClient: React.Dispatch<React.SetStateAction<ClientPrincipal>>;
}

export default function NewComment({ client, setClient }: NewCommentProps) {
  const [userName, setUserName] = useState<string>(null);

  return (
    <div className="mb-4">
      <div className="mb-2">
        <UserDetails client={client} setClient={setClient} userName={userName} setUserName={setUserName} />
      </div>
      {client !== null && userName && (
        <NewCommentForm />
      )}
    </div>
  );
}

function NewCommentForm() {
  const [expanded, setExpanded] = useState(false);
  const [currentInput, setCurrentInput] = useState("");

  const formRef = useRef<HTMLTextAreaElement>();
  useEffect(() => {
    if (expanded) {
      formRef.current.focus();
    }
  }, [expanded]);

  return (
    <div>
      {!expanded && (
        <button
          className="block leading-none p-2 rounded-md w-full bg-green-200 dark:bg-green-800 hover:bg-green-300 dark:hover:bg-green-700"
          onClick={() => setExpanded(true)}
        >
          <FontAwesomeIcon icon={faEdit} />
          &nbsp;
          Write comment
        </button>
      )}
      <form
        className={expanded ? null : "hidden"}
        onReset={() => {
          if (window.confirm("Are you sure that you want to cancel writing this comment?")) {
            setExpanded(false);
            setCurrentInput("");
          }
        }}
      >
        <textarea
          ref={formRef}
          className="w-full text-black"
          rows={5}
          value={currentInput}
          onChange={e => setCurrentInput(e.target.value)}
          placeholder="Type a comment here..."
        />
        <div className="flex">
          <a
            href="https://commonmark.org/help/"
            target="_blank"
            rel="noreferrer noopener"
            className="block text-xs text-blue-800 dark:text-indigo-300 hover:underline"
          >
            (markdown reference)
          </a>
          <div className="flex-grow" />
          <button
            type="reset"
            className="block p-1 leading-none bg-gray-300 hover:bg-gray-400 dark:bg-gray-900 dark:hover:bg-black rounded-sm"
          >
            <FontAwesomeIcon icon={faTimes} className="mr-1" />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
