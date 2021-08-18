import React from "react";
import { Link } from "gatsby";

import * as styles from "./Embed.module.css";

interface EmbedProps {
  url: string;
  alt: string;
  portrait?: boolean;
}

export default function Embed({ url, alt, portrait }: EmbedProps) {
  const content = url.endsWith(".pdf") ? (
    <object
      type="application/pdf"
      width="100%"
      data={url}
      title={alt}
      data-portrait={portrait}
    >
      {alt}
    </object>
  ) : (
    <Link to={url}>
      <img src={url} alt={alt} title={alt} width="100%" />
    </Link>
  );

  return <div className={styles.embed}>{content}</div>;
}
