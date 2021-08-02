import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import Single, { Comment } from "./Single";
import Wrapper from "./Wrapper";
import NewComment from "./NewComment";
import Alert from "./Alert";

interface CommentBlockProps {
    slug: string;
}

export default function CommentBlock({ slug }: CommentBlockProps) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [comments, setComments] = useState<Comment[]>();

    const fetchComments = useCallback(async () => {
        setError(false);
        try {
            const response = await fetch(`/api/comment/${slug}`);
            if (response.ok) {
                const body = await response.json() as Comment[];
                setComments(body);
                setError(false);
            } else {
                throw new Error();
            }
        }
        catch {
            setError(true);
        }
        finally {
            setLoading(false);
        }
    }, [slug]);

    useEffect(() => {
        fetchComments();
    }, [slug, fetchComments]);

    if (loading) {
        return (
            <Wrapper>
                <FontAwesomeIcon icon={faSpinner} spin />
                &nbsp;
                Loading comments...
            </Wrapper>
        );
    } else if (error) {
        return (
            <Wrapper>
                <Alert retry={() => {
                    setError(false);
                    if (!loading) {
                        setLoading(true);
                        setTimeout(() => fetchComments(), 500);
                    }
                }}>
                    &nbsp;
                    An error occurred fetching comments.
                </Alert>
            </Wrapper>
        );
    } else {
        return (
            <Wrapper num={comments.length}>
                <NewComment />
                <div className="flex flex-col gap-2">
                    {comments?.map(c => (
                        <Single key={c.id} comment={c} />
                    ))}
                    {comments.length === 0 && (
                        <em className="text-opacity-60 italic">(no comments on this page yet)</em>
                    )}
                </div>
            </Wrapper>
        );
    }
}
