import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faSpinner,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import * as styles from "./UserNameForm.module.css";

interface UserNameFormProps {
  id: string;
  setUserName: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export function UserNameForm({ id, setUserName }: UserNameFormProps) {
  const [currentInput, setCurrentInput] = useState("");
  const [sending, setSending] = useState(false);
  const [inputError, setInputError] = useState<string>();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (sending) {
      return;
    }
    setInputError(undefined);
    setSending(true);
    try {
      if (currentInput.length < 3 || currentInput.length > 25) {
        setInputError("Username must be between 3 and 25 characters.");
      } else {
        const requestBody = {
          userName: currentInput,
          id: id,
        };
        const response = await fetch(`/api/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
        const body = await response.json();
        // must be before setUserName as otherwise the component is unmounted before the state change
        setSending(false);
        setUserName(body.userName);
      }
    } catch {
      setInputError(
        "There was an error submitting the form. Try again or contact me."
      );
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} onReset={() => setCurrentInput("")}>
      <p>
        You must choose a username (3&ndash;25 characters) before commenting:
      </p>
      <div className={styles.chooser}>
        <input
          type="text"
          placeholder="Jane Doe"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          disabled={sending}
          className={
            inputError ? styles.error : sending ? styles.sending : undefined
          }
        />
        <button disabled={sending} type="submit">
          <FontAwesomeIcon
            icon={sending ? faSpinner : inputError ? faTimes : faArrowRight}
            spin={sending}
            title="Submit"
          />
        </button>
        {inputError && <p>{inputError}</p>}
      </div>
    </form>
  );
}
