import React from "react";
import Navbar from "../navbar/Navbar";
import styles from "./Layout.module.css";
import Footer from "../Footer";

const Layout = ({ children }) => {
    return (
        <div className={styles.backgroundImage}>
            <Navbar transparent={true} />
            <div className={styles.layoutmainBody}>{children}</div>
            <Footer></Footer>
        </div>
    );
};

export default Layout;
