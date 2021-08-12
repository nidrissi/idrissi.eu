import React from "react";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

import * as styles from "./Pager.module.css";

interface PagerProps {
  numPages: number;
  currentPage: number;
  type: string;
}
export default function Pager({ numPages, currentPage, type }: PagerProps) {
  if (numPages === 1) {
    return null;
  }

  function indexToLink(i: number): string {
    return `/${type}${i > 1 ? `/${i}` : ""}`;
  }

  return (
    <nav className={styles.pager}>
      <Link
        to={indexToLink(1)}
        title="First page"
        className={styles.button}
        activeClassName={styles.disabled}
      >
        <FontAwesomeIcon icon={faAngleDoubleLeft} />
      </Link>
      {currentPage > 1 && (
        <Link
          to={indexToLink(currentPage - 1)}
          title="Previous page"
          className={styles.button}
          activeClassName={styles.disabled}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </Link>
      )}
      {Array.from({ length: numPages }, (_x, i) => (
        <Link
          key={i}
          to={indexToLink(i + 1)}
          title={`Page ${i + 1}`}
          className={styles.button}
          activeClassName={styles.disabled}
        >
          {i + 1}
        </Link>
      ))}
      {currentPage < numPages && (
        <Link
          to={indexToLink(currentPage + 1)}
          title="Next page"
          className={styles.button}
          activeClassName={styles.disabled}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </Link>
      )}
      <Link
        to={indexToLink(numPages)}
        title="Last page"
        className={styles.button}
        activeClassName={styles.disabled}
      >
        <FontAwesomeIcon icon={faAngleDoubleRight} />
      </Link>
    </nav>
  );
}
