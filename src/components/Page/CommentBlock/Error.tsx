import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb } from "@fortawesome/free-solid-svg-icons";

import * as styles from "./Error.module.css";
import AlertDiv from "../AlertDiv";

interface AlertProps {
  children: React.ReactNode;
  retry?: () => void;
}

export default function Error({ children, retry }: AlertProps) {
  return (
    <AlertDiv color="red">
      <FontAwesomeIcon icon={faBomb} />
      &nbsp;
      {children}
      {retry && (
        <>
          {" "}
          <button onClick={retry} className={styles.retry}>
            Retry?
          </button>
        </>
      )}
    </AlertDiv>
  );
}
