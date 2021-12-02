import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postCharacter, getOccupations } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import styles from './styles/Form.module.css'

export default function Form(){ 
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const occ = useSelector((state) => state.occupations)
    const [errors, setErrors] = useState({})
    
    const [input, setInput] = useState({
        name: "",
        nickname: "",
        birthday: "",
        status: "",
        img: "",
        occupations: []
    })

    useEffect(()=>{
        dispatch(getOccupations())
    }, [dispatch])
    console.log("ESTO ES OCC: " + occ[0])
    function handleChange(e){

    }

    return (
        <div className={styles.containerGlobalForm}>

            <nav className={styles.navForm}>
                
                <Link to = '/' className={styles.containerTitleForm}>
                    <h3 className={styles.titleForm}>Breaking Bad</h3>
                </Link>
                <Link to = '/home'>
                    <button className={styles.btnForm}>Go home</button>
                </Link>

            </nav>


         
            <div className={styles.containerInfoForm}>
               
                <h1>Create your character!</h1>
                
                <div className={styles.containerInputsForm}>
                    <form>
                        
                        <h4>Name*:</h4>
                        <input 
                            type="text"
                            value={input.name}
                            name="name"
                            onChange={e => handleChange(e)} />

                        <h4>Nickname*:</h4>
                        <input 
                            type="text"
                            value={input.nickname}
                            name="nickname"
                            onChange={e => handleChange(e)} />        
                        
                        <h4>Birthday*:</h4>
                        <input 
                            type="text"
                            value={input.birthday}
                            name="birthday"
                            onChange={e => handleChange(e)} />

                        <h4>Image:</h4>
                        <input 
                            type="text"
                            value={input.img}
                            name="img"
                            onChange={e => handleChange(e)} />


                        <h4>Status:</h4>
                        <label><input 
                            type="checkbox"
                            value="Alive"
                            name="Alive"
                            onChange={e => handleChange(e)} />Alive</label> 
                        <label><input 
                            type="checkbox"
                            value="Deceased"
                            name="Deceased"
                            onChange={e => handleChange(e)} />Deceased</label>  
                        <label><input 
                            type="checkbox"
                            value="Presumed dead"
                            name="Presumed dead"
                            onChange={e => handleChange(e)} />Presumed dead</label>  
                        <label><input 
                            type="checkbox"
                            value="Unknown"
                            name="Unknown"
                            onChange={e => handleChange(e)} />Unknown</label>  

                        <h4>Occupations:</h4>
                        <select>
                            <option value={occ.name}>{occ}</option>
                        </select>          
                
                    </form>
                </div>

                    <div className={styles.containerBtnForm}>
                        <button type='submit'>Create</button>

                    </div>
                    

            </div>


        </div>


    )

}