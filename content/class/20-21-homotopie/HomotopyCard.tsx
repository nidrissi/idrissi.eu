import React from "react";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as styles from "./HomotopyCard.module.css";

interface CardProps {
  number: number;
  date: string;
  hours: string;
  video: string;
  children: JSX.Element;
}

export default function HomotopyCard({
  number,
  date,
  hours,
  children,
  video,
}: CardProps) {
  return (
    <article className={styles.card}>
      <header>
        <strong>Lecture {number}</strong>
        {" · "}
        {new Date(date).toLocaleDateString()} {hours}
      </header>
      <div>{children}</div>
      <a href={video} target="_blank" rel="noreferrer noopener">
        <FontAwesomeIcon icon={faVideo} />
        &nbsp; Video
      </a>
    </article>
  );
}
