import React from "react";
import styles from './styles/Card.module.css'

export default function Card({ name, nickname, img, status }){

    return (
        <div>

            <h3>Name: {name}</h3>
            <h3>Nickname: {nickname}</h3>
            <h3>Status: {status}</h3>
            <img src={img} alt="Not found" className={styles.imgCard} />
        
        
        </div>
    )

}