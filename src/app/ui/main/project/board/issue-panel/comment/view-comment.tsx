import { useState } from "react";
import cx from "classix";
import { Comment, CommentId } from "@domain/comment";
import { useUserStore } from "@app/store/user.store";
import { UserAvatar } from "@app/components/user-avatar";
import { EditBox } from "./edit-box";

export const ViewComment = ({
  comment,
  removeComment,
}: ViewCommentProps): JSX.Element => {
  const { user } = useUserStore();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const isNotSelfComment = comment.user.id !== user.id;

  const edit = () => setIsEditing(true);
  const cancel = () => setIsEditing(false);

  const remove = () => {
    removeComment(comment.id);
  };

  const save = (commentText: string): void => {
    comment.message = commentText;
    setIsEditing(false);
  };

  const formatDateTime = (): string => {
    if (!comment.createdAt) return "DATE UNDEFINED";

    const locale = "en-US";
    const date = new Date(comment.createdAt).toLocaleDateString(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const time = new Date(comment.createdAt).toLocaleTimeString(locale, {
      hour12: false,
      timeStyle: "short",
    });

    return `${time} · ${date}`;
  };

  const IdleComment = (): JSX.Element => (
    <div className="font-primary-light">
      <p>{comment.message}</p>
      <div
        className={cx(
          "mt-3 text-font-light dark:text-font-light-dark",
          isNotSelfComment ? "hidden" : "visible"
        )}
      >
        <button
          onClick={edit}
          disabled={isNotSelfComment}
          className="font-primary-light text-xs hover:underline"
        >
          Edit
        </button>
        <span className="mx-2">{"·"}</span>
        <button
          onClick={remove}
          disabled={isNotSelfComment}
          className="font-primary-light text-xs hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex gap-6">
      <UserAvatar {...comment.user} tooltip={false} />
      <div style={{ width: "100%" }}>
        <p className="mr-4 inline-block font-primary-bold">
          {comment.user.name}
        </p>
        <span className="font-primary-light text-xs">{formatDateTime()}</span>
        <div className="mt-3">
          {isEditing ? (
            <EditBox
              defaultMessage={comment.message}
              save={save}
              cancel={cancel}
              autofocus
            />
          ) : (
            <IdleComment />
          )}
        </div>
      </div>
    </div>
  );
};

interface ViewCommentProps {
  comment: Comment;
  removeComment: (commentId: CommentId) => void;
}
