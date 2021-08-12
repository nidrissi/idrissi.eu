import React from "react";
import { Link } from "gatsby";

import * as styles from "./Embed.module.css";

interface EmbedProps {
  url: string;
  alt: string;
}

export default function Embed({ url, alt }: EmbedProps) {
  const content = url.endsWith(".pdf") ? (
    <div className={styles.slides}>
      <object type="application/pdf" data={url} title={alt}>
        {alt}
      </object>
    </div>
  ) : (
    <Link to={url}>
      <img src={url} alt={alt} title={alt} />
    </Link>
  );

  return <div className={styles.embed}>{content}</div>;
}
