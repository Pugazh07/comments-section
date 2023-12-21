// import { EMPTY_OBJECT } from "./constants";

class Utility {
  static getCommentsFromStorage() {
    const storedValue = localStorage.getItem("comments");
    return storedValue ? JSON.parse(storedValue) : [];
  }

  static getComments() {
    const existingComments = this.getCommentsFromStorage();
    const comments = existingComments.reduce((result, commentData) => {
      const { id, parentCommentId } = commentData;
      return parentCommentId > 0
        ? result
        : { ...result, [id]: { ...commentData, replies: [] } };
    }, {});
    existingComments.forEach((commentData) => {
      const { parentCommentId } = commentData;
      if (parentCommentId > 0 && comments[parentCommentId]) {
        comments[parentCommentId].replies.push(commentData);
      }
    });
    return Object.values(comments);
  }

  static setComments(comments) {
    if (Array.isArray(comments)) {
      localStorage.setItem("comments", JSON.stringify(comments));
    }
  }

  static addNewComment(comment) {
    const comments = this.getCommentsFromStorage();
    const id = comments.length > 0 ? comments[0].id + 1 : 1;
    comments.splice(0, 0, {
      ...comment,
      id,
      createdAt: Date.now(),
      parentCommentId: 0,
    });
    this.setComments(comments);
  }

  static addNewReply(parentCommentId, replyComment) {
    const comments = this.getCommentsFromStorage();
    const id = comments.length > 0 ? comments[0].id + 1 : 1;
    comments.splice(0, 0, {
      ...replyComment,
      id,
      createdAt: Date.now(),
      parentCommentId,
    });
    this.setComments(comments);
  }

  static updateComment(updateCommentId, updatedComment) {
    const existingComments = this.getCommentsFromStorage();
    const updatedComments = existingComments.map((ele) => {
      const { id } = ele;
      return id === updateCommentId
        ? { ...updatedComment, updatedAt: Date.now() }
        : ele;
    });
    this.setComments(updatedComments);
  }

  static deleteComment(deleteCommentId) {
    const existingComments = this.getCommentsFromStorage();
    const updatedComments = existingComments.filter(
      ({ id }) => id !== deleteCommentId
    );
    this.setComments(updatedComments);
  }

  static getFormattedDate(value) {
    const date = new Date(value);
    const options = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options).split(" ");
    const month = formattedDate[0];
    const year = formattedDate[2];

    const day = date.getDate();
    let daySuffix = "th";
    if (day === 1 || day === 21 || day === 31) {
      daySuffix = "st";
    } else if (day === 2 || day === 22) {
      daySuffix = "nd";
    } else if (day === 3 || day === 23) {
      daySuffix = "rd";
    }

    const formattedDay = day + daySuffix;
    return `${formattedDay} ${month} ${year}`;
  }
}

export default Utility;
