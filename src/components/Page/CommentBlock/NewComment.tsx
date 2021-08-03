import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "@reach/router";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Alert from "./Alert";

interface clientPrincipal {
  userId: string;
  identityProvider: string;
  userDetails: string;
  userRoles: string[];
}

export default function Post() {
  const { pathname } = useLocation();

  const [client, setClient] = useState<clientPrincipal>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchClient = useCallback(async () => {
    try {
      const response = await fetch("/.auth/me");
      if (response.ok) {
        const body = await response.json();
        setClient(body.clientPrincipal);
        setError(false);
      }
      else {
        throw new Error();
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchClient(); }, [fetchClient]);

  return (
    <div className="mb-4">
      {error && (
        <Alert retry={() => {
          setError(false);
          if (!loading) {
            setLoading(true);
            setTimeout(() => fetchClient(), 500);
          }
        }}>
          There was an error fetching your login details.
        </Alert>
      )}
      {client ? (
        <div>
          Logged-in as {client.userId}.
          {" "}
          <button
            className="hover:bg-red-400 dark:hover:bg-red-900 leading-none p-2 rounded-md"
            onClick={() => {
              window.location.assign(`/.auth/logout?post_logout_redirect_uri=${encodeURI(pathname)}`);
            }}
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            &nbsp;
            Logout
          </button>
        </div>
      ) : (
        <button
          className="block p-2 leading-none rounded-md hover:bg-yellow-400 dark:hover:bg-yellow-800"
          onClick={() => alert("Unimplemented!")}
        >
          <FontAwesomeIcon icon={faSignInAlt} />
          &nbsp;
          Login to comment
        </button>
      )}
    </div>
  );
}
