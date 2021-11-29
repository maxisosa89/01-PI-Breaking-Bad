import React from "react";
import styles from './styles/Paged.module.css'

export default function Paged ({charactersPerPage, allCharacters, paged}) {
    const pageNumber = []
    for (let i = 0; i < Math.ceil(allCharacters/charactersPerPage); i++){
        pageNumber.push(i+1)
    }
    return (
        <div>
            <ul>
                {
                    pageNumber && pageNumber.map( el => (
                        <li className={styles.liPaged} key={el}>
                            <button onClick={() => paged(el)} className={styles.btnPaged}>{el}</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}