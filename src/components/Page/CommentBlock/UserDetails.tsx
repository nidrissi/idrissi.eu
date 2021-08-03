import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "@reach/router";
import { faSignInAlt, faSignOutAlt, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Alert from "./Alert";
import { ClientPrincipal } from "./ClientPrincipal";

interface UserDetailsProps {
  client: ClientPrincipal;
  setClient: React.Dispatch<React.SetStateAction<ClientPrincipal>>;
}

export default function UserDetails({ client, setClient }: UserDetailsProps) {
  const { pathname } = useLocation();

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
      setClient(null);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [setClient]);

  useEffect(() => { fetchClient(); }, [fetchClient]);

  if (error) {
    return (
      <Alert retry={() => {
        setError(false);
        if (!loading) {
          setLoading(true);
          setTimeout(() => fetchClient(), 500);
        }
      }}>
        There was an error fetching your login details.
      </Alert>
    );
  }
  else if (loading) {
    return (
      <div>
        <FontAwesomeIcon icon={faSpinner} spin />
        &nbsp;
        Loading login details...
      </div>
    );
  }
  else if (client) {
    return (
      <div>
        Logged-in as {client.userId}.
        {" "}
        <button
          className="hover:bg-red-400 dark:hover:bg-red-900 leading-none p-1 rounded-md"
          onClick={() => {
            window.location.assign(`/.auth/logout?post_logout_redirect_uri=${encodeURI(pathname)}`);
          }}
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
          &nbsp;
          Logout
        </button>
      </div>
    );
  }
  else {
    return (
      <button
        className="block w-full p-2 leading-none rounded-md hover:bg-yellow-400 dark:hover:bg-yellow-800"
        onClick={() => alert("Unimplemented!")}
      >
        <FontAwesomeIcon icon={faSignInAlt} />
        &nbsp;
        Login to comment
      </button>
    );
  }
}
