import { useState } from "react";
import cx from "classix";
import { TextareaAutosize } from "../../../../../../components/textarea-autosize";
import { textAreOnlySpaces } from "../../utils";

export const EditBox = ({
  defaultMessage,
  autofocus,
  save,
  cancel,
}: EditBoxProps): JSX.Element => {
  const [message, setMessage] = useState<string>(defaultMessage);
  const [initError, setInitError] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const messageIsValid = (): boolean => {
    return message.length > 0 && !textAreOnlySpaces(message);
  };

  const resetValues = () => {
    setMessage(defaultMessage);
    setInitError(false);
    setIsEditing(false);
  };

  const onSave = () => {
    if (messageIsValid()) {
      save(message);
      resetValues();
    } else {
      setInitError(true);
    }
  };

  const onCancel = () => {
    if (cancel) cancel();
    resetValues();
  };
  const onFocus = () => setIsEditing(true);

  const isError = initError && !messageIsValid();
  const buttonStyle = cx("mt-2 py-2.5 px-4 rounded");
  const placeholder = isError
    ? "Message cannot be empty"
    : "Add your comment...";

  return (
    <div className="w-full">
      <TextareaAutosize
        value={message}
        setValue={setMessage}
        placeholder={placeholder}
        onFocus={onFocus}
        autofocus={autofocus}
        textareaClassName={cx(
          "min-h-[80px] leading-6 font-primary-light outline outline-1 outline-grey-400 bg-grey-200",
          isError &&
            "placeholder:text-error-main placeholder:text-opacity-70 !outline-error-main !outline-2"
        )}
      />
      <div
        className={cx("space-x-2 text-sm", isEditing ? "visible" : "hidden")}
      >
        <button
          className={cx(
            buttonStyle,
            "bg-primary-main text-white hover:bg-primary-main-hover"
          )}
          onClick={onSave}
        >
          Save
        </button>
        <button
          className={cx(
            buttonStyle,
            "hover:bg-error-light hover:text-error-dark"
          )}
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

interface EditBoxProps {
  defaultMessage: string;
  autofocus?: boolean;
  save: (commentText: string) => void;
  cancel?: () => void;
}
