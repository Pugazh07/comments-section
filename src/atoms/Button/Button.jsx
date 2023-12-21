import React from "react";
import PropTypes from "prop-types";
import { EMPTY_FUNCTION } from "../../constants";
import styles from "./Button.module.css";

const Button = ({ label, disabled, view, onClick }) => {
  return (
    <button
      className={`${styles.button} ${styles[view] || ""} ${
        disabled ? styles.disabled : ""
      }`}
      disabled={disabled}
      type="button"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  view: PropTypes.oneOf(["primary", "secondary"]),
  onClick: PropTypes.func,
};

Button.defaultProps = {
  disabled: false,
  view: "primary",
  onClick: EMPTY_FUNCTION,
};

export default Button;
