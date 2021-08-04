import React, { useCallback, useState } from "react";
import UserDetails from "./UserDetails";

export default function NewComment() {
  const [okToPost, setOkToPost] = useState(false);

  const onOk = useCallback(() => setOkToPost(true), []);

  return (
    <div className="mb-4">
      <UserDetails onOk={onOk} />
      <textarea
        disabled={!okToPost}
        className="w-full"
        rows={5}
      />
    </div>
  );
}
