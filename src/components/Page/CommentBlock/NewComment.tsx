import React, { useState } from "react";
import { ClientPrincipal } from "./ClientPrincipal";
import UserDetails from "./UserDetails";

export default function NewComment() {
  const [client, setClient] = useState<ClientPrincipal>(null);
  const [userName, setUserName] = useState<string>(null);

  return (
    <div className="mb-4">
      <div className="mb-2">
        <UserDetails client={client} setClient={setClient} userName={userName} setUserName={setUserName} />
      </div>
      {client !== null && userName && (
        <textarea
          className="w-full text-black"
          rows={5}
        />
      )}
    </div>
  );
}
