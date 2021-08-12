import React from "react";

import { alertDiv } from "./AlertDiv.module.css";

interface AlertDivProps {
  color?: string;
  children: JSX.Element;
}

export default function AlertDiv({ color, children }: AlertDivProps) {
  return (
    <div className={alertDiv} data-color={color}>
      {children}
    </div>
  );
}
