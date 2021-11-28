import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDetail } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Detail(){
    const { id } = useParams()
    const imageDefault = ""
    const dispatch = useDispatch()
    useEffect(()=> {
        dispatch(getDetail(id))
    }, [id, dispatch])
    const myCharacter = useSelector((state)=> state.detail)
    console.log(myCharacter)
    return (
        <div>
            
            <nav>
                
                <Link to = '/'>
                    <h3>Breaking Bad</h3>
                </Link>
                <Link to = '/home'>
                    <button>Go home</button>
                </Link>

            </nav>

            <div>
                {
                    myCharacter.length > 0 ?

                    <div>
                    <h1>{myCharacter[0].name}</h1>
                    <h3>Birthday: {myCharacter[0].birthday}</h3>
                    <h3>Nickname: {myCharacter[0].nickname}</h3>
                    <img src={myCharacter[0].img} alt="Not found" />
                    <h4>ID: {myCharacter[0].char_id}</h4>
                    <h4>Status: {myCharacter[0].status}</h4>
                    <h4>Occupation: {myCharacter[0].occupation.map(el=> el.toUpperCase()+". ")}</h4>
                    </div>

                    :

                    Object.values(myCharacter).length > 0 ?
                    <div>
                    <h1>{myCharacter.name}</h1>
                    <h3>Birthday: {myCharacter.birthday}</h3>
                    <h3>Nickname: {myCharacter.nickname}</h3>
                    <img src={myCharacter.img} alt="Not found" />
                    <h4>ID: {myCharacter.char_id}</h4>
                    <h4>Status: {myCharacter.status}</h4>
                    <h4>Occupation: {myCharacter.occupations.map(el=> el.name.toUpperCase()+". ")}</h4>
                    </div>
                    :
                    <p>Loading...</p>
                }

            </div>



        </div>
    )
}