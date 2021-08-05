import React, { useCallback, useState } from "react";
import UserDetails from "./UserDetails";

export default function NewComment() {
  const [okToPost, setOkToPost] = useState(false);

  const onOk = useCallback(() => setOkToPost(true), []);

  return (
    <div className="mb-4">
      <div className="mb-2">
        <UserDetails onOk={onOk} />
      </div>
      {okToPost && (
        <textarea
          className="w-full"
          rows={5}
        />
      )}
    </div>
  );
}
