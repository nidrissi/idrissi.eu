import React, { useCallback, useEffect, useState } from "react";
import Alert from "./Alert";

interface clientPrincipal {
    userId: string;
    identityProvider: string;
    userDetails: string;
    userRoles: string[];
}

export default function Post() {
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
    useEffect(() => console.log(client), [client]);

    return (
        <div className="mb-2">
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
                    Currently logged-in as {client.userId}.
                </div>
            ) : (
                <div>
                    You must be logged-in to comment.
                    {" "}
                    <button
                        className="p-1 leading-none bg-yellow-400 text-black dark:bg-yellow-900 dark:text-white"
                        onClick={() => alert("Unimplemented!")}
                    >
                        Click here to login.
                    </button>
                </div>
            )}
        </div>
    );
}
