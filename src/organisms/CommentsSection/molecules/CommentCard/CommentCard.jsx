import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../../../../atoms/Button";
import Utility from "../../../../Utility";
import CommentEditor from "../../../../molecules/CommentEditor";
import styles from "./CommentCard.module.css";

const CommentCard = ({ isReply, commentData, onModifySuccess }) => {
  const [showEditor, setShowEditor] = useState(false);
  const [addNewReply, setAddNewReply] = useState(false);

  const { id, name, comment, createdAt } = commentData;
  const createdAtDate = new Date(createdAt);

  const onEditComment = (updatedComment) => {
    Utility.updateComment(id, updatedComment);
    onModifySuccess();
    setShowEditor(false);
  };

  const onDeleteComment = () => {
    Utility.deleteComment(id);
    onModifySuccess();
  };

  const onSaveNewReply = (replyComment) => {
    Utility.addNewReply(id, replyComment);
    onModifySuccess();
    setAddNewReply(false);
  };

  return (
    <div className={styles.commentCardContainer}>
      {!showEditor ? (
        <section className={styles.commentCard}>
          <header>
            <span className={styles.userName}>{name}</span>
            <span>{Utility.getFormattedDate(createdAt)}</span>
          </header>
          <div className={styles.comment}>
            {comment.split("\n").map((line, index) => (
              <p key={`${line}-${index}`}>{line}</p>
            ))}
          </div>
          <footer>
            {!isReply && (
              <Button
                disabled={addNewReply}
                label="Reply"
                view="secondary"
                onClick={() => setAddNewReply(true)}
              />
            )}
            <Button
              label="Edit"
              view="secondary"
              onClick={() => setShowEditor(true)}
            />
          </footer>
          <span className={styles.deleteIcon} onClick={onDeleteComment}>
            &#128465;
          </span>
        </section>
      ) : (
        <CommentEditor
          value={commentData}
          onCancel={() => setShowEditor(false)}
          onSave={onEditComment}
        />
      )}
      {addNewReply && (
        <CommentEditor
          className={styles.newReplyEditor}
          label="Reply"
          onCancel={() => setAddNewReply(false)}
          onSave={onSaveNewReply}
        />
      )}
    </div>
  );
};

CommentCard.propTypes = {
  isReply: PropTypes.bool,
};

CommentCard.defaultProps = {
  isReply: false,
};

export default CommentCard;
