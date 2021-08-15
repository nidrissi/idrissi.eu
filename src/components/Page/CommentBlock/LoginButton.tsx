import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import {
  faApple,
  faFacebook,
  faGithub,
  faGoogle,
  faMicrosoft,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import * as styles from "./LoginButton.module.css";

interface Provider {
  url: string;
  label: string;
  icon: IconDefinition;
}

const providers: Provider[] = [
  {
    url: "aad",
    label: "Microsoft",
    icon: faMicrosoft,
  },
  {
    url: "github",
    label: "GitHub",
    icon: faGithub,
  },
  {
    url: "twitter",
    label: "Twitter",
    icon: faTwitter,
  },
  {
    url: "facebook",
    label: "Facebook",
    icon: faFacebook,
  },
  {
    url: "google",
    label: "Google",
    icon: faGoogle,
  },
  {
    url: "apple",
    label: "Apple",
    icon: faApple,
  },
];

export default function LoginButton() {
  const [clicked, setClicked] = useState(false);

  return (
    <div className={styles.outer}>
      {!clicked ? (
        <button onClick={() => setClicked(true)}>
          <FontAwesomeIcon icon={faSignInAlt} />
          &nbsp; Login to comment
        </button>
      ) : (
        <div className={styles.wrapper}>
          {providers.map((p) => (
            <button
              key={p.url}
              title={`Login with ${p.label}`}
              onClick={() => {
                const location = window.location.pathname;
                const loginUri = `/.auth/login/${
                  p.url
                }?post_login_redirect_uri=${encodeURI(
                  location + "#__comments"
                )}`;
                window.location.assign(loginUri);
              }}
            >
              <FontAwesomeIcon icon={p.icon} />
              &nbsp;
              {p.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
