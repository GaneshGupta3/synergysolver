import React from "react";
import styles from "./ChatPage.module.css"
const ChatPage = () => {
    return (
        <>
            <ul className={styles.messages}></ul>
            <form className={styles.form} action="">
                <input className={styles.input} autocomplete="off" />
                <button>Send</button>
            </form>
        </>
    );
};

export default ChatPage;