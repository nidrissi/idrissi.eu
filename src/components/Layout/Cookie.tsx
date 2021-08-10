import React, { useEffect, useState } from "react";
import { cookie } from "./Cookie.module.css";

export default function Cookie() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (
      !document.cookie
        .split("; ")
        .find((row) => row.startsWith("cookieToastShown="))
    ) {
      const date = new Date();
      date.setFullYear(date.getFullYear() + 1);
      setShow(true);
      setInterval(() => {
        setShow(false);
      }, 5000);
      document.cookie = `cookieToastShown=true; expires=${date.toUTCString()}; Secure; SameOrigin=strict`;
    }
  }, []);

  if (!show) {
    return null;
  } else {
    return (
      <aside className={cookie}>
        <p>
          I use cookies to analyze traffic.{" "}
          <a href="/misc/cookie">The cookie policy can be found here.</a>
        </p>
      </aside>
    );
  }
}
