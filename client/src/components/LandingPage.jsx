import React from "react";
import { Link } from "react-router-dom";
import styles from './styles/LandingPage.module.css'

export default function LandingPage(){
    return (
        <div className={styles.containerGlobalLanding}>
            <div className={styles.containerLanding}>
                <div className={styles.containerTitleBtnLanding}>
                    <h1 className={styles.titleLanding}>Welcome to</h1>
                    <div>
                        <Link to = '/home'>
                            <button className={styles.btnLanding}>Go!</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}