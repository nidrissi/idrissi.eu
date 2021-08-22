import React from "react";

import * as styles from "./AlertDiv.module.css";

interface AlertDivProps {
  color?: "red" | "green" | "blue" | "yellow";
  children: React.ReactNode;
}

export default function AlertDiv({ color, children }: AlertDivProps) {
  return (
    <div className={styles.alertDiv} data-color={color}>
      {children}
    </div>
  );
}
