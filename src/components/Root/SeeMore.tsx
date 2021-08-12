import React from "react";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import * as styles from "./SeeMore.module.css";

interface SeeMoreProps {
  to: string;
  children: React.ReactNode;
}

export default function SeeMore({ to, children }: SeeMoreProps) {
  return (
    <Link to={to} className={styles.seemore}>
      See more {children}&nbsp;
      <FontAwesomeIcon icon={faChevronRight} size="sm" />
    </Link>
  );
}
