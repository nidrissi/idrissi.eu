import React from "react";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";

import * as styles from "./TagLink.module.css";

interface TagLinkProps {
  tag: string;
  big?: boolean;
  count?: number;
}

export default function TagLink({ tag, big, count }: TagLinkProps) {
  return (
    <Link
      to={`/tag/${tag}`}
      className={`${styles.tagLink} ${big ? styles.big : styles.small}`}
    >
      <FontAwesomeIcon icon={faTag} size="sm" />
      &nbsp;
      {tag}
      {count && <span className="text-lg"> [{count}]</span>}
    </Link>
  );
}
