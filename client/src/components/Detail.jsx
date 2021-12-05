import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDetail } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from './styles/Detail.module.css'

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
        <div className={styles.containerGlobalDetail}>
            <nav className={styles.navDetail}>
                <Link to = '/' className={styles.containerTitleDetail}>
                    <h3 className={styles.titleDetail}>Breaking Bad</h3>
                </Link>
                <Link to = '/home'>
                    <button className={styles.btnDetail}>Go home</button>
                </Link>
            </nav>
            <div className={styles.containerInfoDetail}>
                {
                    myCharacter.length > 0 ?
                    <div className={styles.containerCharacter}>
                        <div className={styles.containerImgDetail}>
                            <img src={myCharacter[0].img} alt="Not found" className={styles.imgDetail} />
                        </div>
                        <div className={styles.containerNamesDetail}>
                            <div className={styles.containerTitleNameDetail}>
                                <h1 className={styles.titleNameDetail}>{myCharacter[0].name}</h1>
                            </div>
                            <div className={styles.containerBirthdayDetail}>
                                <h3>Birthday:</h3>
                                <h3>{myCharacter[0].birthday}</h3>
                            </div>
                            <div className={styles.containerNickDetail}>
                                <h3>Nickname:</h3>
                                <h3>{myCharacter[0].nickname}</h3>
                            </div>
                        </div>
                        <div className={styles.containerIdDetail}>
                            <div className={styles.containerTitleIdDetail}>
                                <h4>ID:</h4>
                                <h4>{myCharacter[0].char_id}</h4>
                            </div>
                            <div className={styles.containerStatusDetail}>
                                <h4>Status:</h4>
                                <h4>{myCharacter[0].status}</h4>
                            </div>
                            <div className={styles.containerOccDetail}>
                                <h4>Occupation:</h4>
                                <h4>{myCharacter[0].occupation.map(el=> el.toUpperCase()+". ")}</h4>
                            </div>
                        </div>
                    </div>
                    :
                    Object.values(myCharacter).length > 0 ?
                    <div className={styles.containerCharacter}>
                        <div className={styles.containerImgDetail}>
                            <img src={myCharacter.img} alt="Not found" className={styles.imgDetail}/>
                        </div>
                        <div className={styles.containerNamesDetail}>
                            <div className={styles.containerTitleNameDetail}>
                                <h1 className={styles.titleNameDetail}>{myCharacter.name}</h1>
                            </div>
                            <div className={styles.containerBirthdayDetail}>
                                <h3>Birthday:</h3>
                                <h3>{myCharacter.birthday}</h3>
                            </div>
                            <div className={styles.containerNickDetail}>
                                <h3>Nickname:</h3>
                                <h3>{myCharacter.nickname}</h3>
                            </div>
                        </div>
                        <div className={styles.containerIdDetail}>
                            <div className={styles.containerTitleIdDetail}>
                                <h4>ID:</h4>
                                <h4>{myCharacter.char_id}</h4>
                            </div>
                            <div className={styles.containerStatusDetail}>
                                <h4>Status:</h4>
                                <h4>{myCharacter.status}</h4>
                            </div>
                            <div className={styles.containerOccDetail}>
                                <h4>Occupation:</h4>
                                <h4>{myCharacter.occupations.map(el=> el.name.toUpperCase()+". ")}</h4>
                            </div>
                        </div>
                    </div>
                    :
                    <p>Loading...</p>
                }
            </div>
        </div>
    )
}