import React from 'react';
import styles from './Dashboard.module.css';
const Dashboard = () => {
  return (
    <div className={styles.mainBody}>
        <div className={`${styles.content} ${styles.leftbar}`}>sidebar</div>
        <div className={`${styles.content} ${styles.problemDisplay}`}>main content(problem suggestions or problem display)</div>
        <div className={`${styles.content} ${styles.tagsDisplay}`}>tags</div>
    </div>
  )
}

export default Dashboard