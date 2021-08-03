import React, { useState } from "react";
import UserDetails from "./UserDetails";
import { ClientPrincipal } from "./ClientPrincipal";

export default function NewComment() {
  const [client, setClient] = useState<ClientPrincipal>(null);

  return (
    <div className="mb-4">
      <UserDetails client={client} setClient={setClient} />
    </div>
  );
}
