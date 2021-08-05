import React, { useState } from "react";
import { ClientPrincipal } from "./ClientPrincipal";
import UserDetails from "./UserDetails";

interface NewCommentProps {
  client: ClientPrincipal;
  setClient: React.Dispatch<React.SetStateAction<ClientPrincipal>>;
}

export default function NewComment({ client, setClient }: NewCommentProps) {
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
