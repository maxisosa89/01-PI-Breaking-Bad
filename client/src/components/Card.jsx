import React from "react";

export default function Card({ name, nickname, img }){

    return (
        <div>

            <h3>Name: {name}</h3>
            <h3>Nickname: {nickname}</h3>
            <img src={img} alt="Not found" />
        
        
        </div>
    )

}