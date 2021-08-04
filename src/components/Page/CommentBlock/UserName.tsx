import { faArrowRight, faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
import Alert from "./Alert";
import { ClientPrincipal, formatClient } from "./ClientPrincipal";

interface UserNameProps {
  client: ClientPrincipal;
  onOk: () => void;
}

export default function UserName({ onOk, client }: UserNameProps) {
  const [userName, setUserName] = useState<string>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [currentInput, setCurrentInput] = useState("");
  const [sending, setSending] = useState(false);
  const [inputError, setInputError] = useState<string>(null);

  const fetchUserName = useCallback(async () => {
    try {
      const response = await fetch(`/api/user/${client.userId}`);
      if (response.ok) {
        const body = await response.json();
        setUserName(body.userName);
        setError(false);
      }
      else {
        throw new Error();
      }
    } catch {
      setUserName(null);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [client.userId]);

  useEffect(() => { fetchUserName(); }, [fetchUserName]);
  useEffect(() => {
    if (userName !== null) {
      onOk();
    }
  }, [userName, onOk]);

  if (error) {
    return (
      <Alert retry={() => {
        setError(false);
        if (!loading) {
          setLoading(true);
          setTimeout(() => fetchUserName(), 500);
        }
      }}>
        There was an error fetching your username.
      </Alert>
    );
  }
  else if (loading) {
    return null;
  }
  else if (userName) {
    return (
      <>
        Logged-in as
        {" "}
        <strong title={formatClient(client)}>
          {userName}
        </strong>.
      </>
    );
  } else {
    return (
      <form
        onSubmit={async e => {
          e.preventDefault();
          setInputError(null);
          setSending(true);
          if (currentInput.length < 3 || currentInput.length > 25) {
            setInputError("Username must be between 3 and 25 characters.");
          }
          const response = await fetch(`/api/user/${client.userId}`, {
            method: "POST",
            body: JSON.stringify({ userName: currentInput })
          });
          if (response.ok) {
            const body = await response.json();
            setUserName(body.userName);
          } else {
            setInputError("There was an error submitting the form. Try again or contact me.");
          }
        }}
      >
        You must choose a username before being able to post:
        {" "}
        <input
          type="text"
          placeholder="Jane Doe"
          value={currentInput}
          onChange={e => setCurrentInput(e.target.value)}
          disabled={sending}
          className={sending ? "bg-gray-300 dark:bg-gray-900" : inputError ? "border border-red-600" : null}
        />
        {" "}
        <button
          disabled={sending}
          type="submit"
          className="p-1 leading-none bg-blue-800 text-white dark:bg-blue-300 dark:text-black"
        >
          <FontAwesomeIcon
            icon={sending ? faSpinner : inputError ? faTimes : faArrowRight}
            spin={sending}
            title="Submit"
          />
        </button>
        {inputError && (
          <>
            <br />
            <p>{inputError}</p>
          </>
        )}
      </form>
    );
  }
}
