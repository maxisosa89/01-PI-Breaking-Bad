import React from "react";
import styles from './styles/Card.module.css'

export default function Card({ name, nickname, img, status }){

    return (
        <div className={styles.containerGlobalCard}>
            <div className={styles.containerImgCard}>
            <img src={img} alt="Not found" className={styles.imgCard} />
            </div>


            <div className={styles.containerTextCard}>
            
            <div className={styles.containerNicknameCard}>
            <h3 className={styles.h3Card}>{name}</h3>
            </div>
            
            <div className={styles.containerStatusCard}>
            <h3 className={styles.h3Card}>Nickname:</h3>
            <h3 className={styles.h3Card}>{nickname}</h3>
            <h3 className={styles.h3Card}>Status:</h3>
            <h3 className={styles.h3Card}>{status}</h3>
            </div>
            
            </div>
            
        
        </div>
    )

}