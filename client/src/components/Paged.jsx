import React from "react";

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
                        <li key={el}>
                            <button onClick={() => paged(el)}>{el}</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}