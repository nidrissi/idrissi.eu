import React from "react";
import { skipToken } from "@reduxjs/toolkit/query";

import Error from "./Error";
import { formatClient } from "./ClientPrincipal";
import { useGetClientQuery, useGetUserNameQuery } from "./CommentApi";
import { UserNameForm } from "./UserNameForm";

export default function UserName() {
  const { data: client } = useGetClientQuery({});

  const {
    data: userName,
    isFetching,
    error,
    refetch,
  } = useGetUserNameQuery(client ? {} : skipToken);

  if (!client) {
    return null;
  }

  if (error && "status" in error && error.status === 404) {
    return <UserNameForm id={client.userId} />;
  } else if (isFetching) {
    return null;
  } else if (userName) {
    return (
      <>
        Logged-in as <strong title={formatClient(client)}>{userName}</strong>.
      </>
    );
  } else {
    return (
      <Error retry={() => refetch()}>
        There was an error fetching your username.
      </Error>
    );
  }
}
