export const validateComment = ({ name, comment }) =>
  !!name.trim() && !!comment.trim();
