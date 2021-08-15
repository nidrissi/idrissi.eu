import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb } from "@fortawesome/free-solid-svg-icons";

import * as styles from "./Alert.module.css";

interface AlertProps {
  children: React.ReactNode;
  retry?: () => void;
}

export default function Alert({ children, retry }: AlertProps) {
  return (
    <div className={styles.alert}>
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
    </div>
  );
}
