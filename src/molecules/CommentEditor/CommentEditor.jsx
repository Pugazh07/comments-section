import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "../../atoms/Button";
import { validateComment } from "./CommentEditor.utils";
import { EMPTY_FUNCTION, EMPTY_OBJECT } from "../../constants";
import styles from "./CommentEditor.module.css";

const defaultCommentState = {
  name: "",
  comment: "",
};

const CommentEditor = ({ className, label, value, onSave, onCancel }) => {
  const [commentState, setCommentState] = useState(defaultCommentState);
  const { id, name, comment } = commentState;

  const isEdit = !!id;

  useEffect(() => {
    if (!!value && Object.keys(value).length > 0) {
      setCommentState(value);
    }
  }, [value]);

  const onClickPost = () => {
    const updatedCommentState = {
      ...commentState,
      name: name.trim(),
      comment: comment.trim(),
    };
    onSave(updatedCommentState);
    /* in case of actual api call, the below func should be sent as a callback to onSave
    and will be called after api success
    */
    setCommentState(defaultCommentState);
  };

  return (
    <form className={`${styles.commentEditor} ${className}`}>
      <header className={styles.header}>{label}</header>
      <input
        className={styles.nameInput}
        disabled={isEdit}
        placeholder="Name"
        value={name}
        onChange={(e) =>
          setCommentState({ ...commentState, name: e.target.value })
        }
      />
      <textarea
        className={styles.commentTextarea}
        placeholder="Comment"
        rows={3}
        value={comment}
        onChange={(e) =>
          setCommentState({ ...commentState, comment: e.target.value })
        }
      />
      <footer className={styles.footer}>
        {onCancel !== EMPTY_FUNCTION && (
          <Button label="Cancel" view="secondary" onClick={onCancel} />
        )}
        <Button
          label={isEdit ? "Update" : "Post"}
          disabled={!validateComment(commentState)}
          view="primary"
          onClick={onClickPost}
        />
      </footer>
    </form>
  );
};

CommentEditor.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

CommentEditor.defaultProps = {
  className: "",
  label: "Comment",
  value: EMPTY_OBJECT,
  onCancel: EMPTY_FUNCTION,
};

export default CommentEditor;
