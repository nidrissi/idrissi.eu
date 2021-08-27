import React, { useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";

import Error from "./Error";
import { useGetClientQuery, useGetUsernameQuery } from "./CommentApi";
import { UsernameForm } from "./UsernameForm";
import { faInfoCircle, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Username() {
  const { data: client } = useGetClientQuery({});

  const {
    data: username,
    isFetching,
    error,
    refetch,
  } = useGetUsernameQuery(client ? {} : skipToken);

  const [detailsExpanded, setDetailsExpanded] = useState(false);

  if (!client) {
    return null;
  }

  if (error && "status" in error && error.status === 404) {
    return <UsernameForm id={client.userId} />;
  } else if (isFetching) {
    return (
      <div>
        <FontAwesomeIcon icon={faSpinner} spin />
        &nbsp;Loading username...
      </div>
    );
  } else if (username) {
    return (
      <div>
        Logged-in as <strong>{username}</strong>{" "}
        <button
          onClick={() => setDetailsExpanded((e) => !e)}
          title="Show user id"
        >
          {detailsExpanded ? (
            <>Id: {client.userId}</>
          ) : (
            <FontAwesomeIcon icon={faInfoCircle} size="sm" />
          )}
        </button>
      </div>
    );
  } else {
    return (
      <Error retry={() => refetch()}>
        There was an error fetching your username.
      </Error>
    );
  }
}
