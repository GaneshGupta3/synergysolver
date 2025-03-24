import React from "react";
import Navbar from "../navbar/Navbar";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
    return (
        <div className={styles.backgroundImage}>
            <Navbar transparent={true} />
            <div className={styles.layoutmainBody}>{children}</div>
        </div>
    );
};

export default Layout;
