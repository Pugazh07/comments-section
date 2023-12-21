import React, { useMemo, useState } from "react";
import CommentEditor from "../../molecules/CommentEditor";
import CommentCard from "./molecules/CommentCard";
import Utility from "../../Utility";
import { EMPTY_ARRAY } from "../../constants";
import styles from "./CommentsSection.module.css";

const CommentsSection = () => {
  const [comments, setComments] = useState(Utility.getComments());
  const [sort, setSort] = useState("desc");

  const sortedComments = useMemo(
    () =>
      comments.sort(({ createdAt: a }, { createdAt: b }) =>
        sort === "asc" ? a - b : b - a
      ),
    [comments, sort]
  );

  const refreshComments = () => {
    setComments(Utility.getComments());
  };

  const onPostNewComment = (newComment) => {
    Utility.addNewComment(newComment);
    refreshComments();
  };

  const onClickSortIcon = () => {
    setSort(sort === "asc" ? "desc" : "asc");
  };

  return (
    <div className={styles.commentsSectionContainer}>
      <section className={styles.newCommentContainer}>
        <CommentEditor onSave={onPostNewComment} />
      </section>
      <section className={styles.sortSection}>
        <span>Sort By: Date and Time</span>
        <span className={styles.sortIcon} onClick={onClickSortIcon}>
          {sort === "asc" ? <>&uarr;</> : <>&darr;</>}
        </span>
      </section>
      <section className={styles.commentsListContainer}>
        {sortedComments.map((commentData) => {
          const { id, replies } = commentData;
          return (
            <div key={id}>
              <CommentCard
                commentData={commentData}
                onModifySuccess={refreshComments}
              />
              <section className={styles.replyListContainer}>
                {(replies || EMPTY_ARRAY).map((replyData) => {
                  const { id: replyId } = replyData;
                  return (
                    <CommentCard
                      isReply
                      key={replyId}
                      commentData={replyData}
                      onModifySuccess={refreshComments}
                    />
                  );
                })}
              </section>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default CommentsSection;
