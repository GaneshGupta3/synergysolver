import React from 'react'
import styles from "./StyledButton.module.css";

const StyledButton = ({executeFunction , displayText}) => {
  return (
    <button onClick={executeFunction} className={styles.styledButton}>{displayText}</button>
  )
}

export default StyledButton;