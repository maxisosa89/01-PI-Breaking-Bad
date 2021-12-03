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

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        console.log(input)
    }

    function handleCheck(e) {
        if (e.target.checked) {
            setInput({
                ...input,
                status: e.target.value
            })
        }
    }

    function handleSelect(e) {
        setInput({
            ...input,
            occupations: [...input.occupations, e.target.value]
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(input);
        dispatch(postCharacter(input));
        alert("Character created.");
        setInput({
            name: "",
            nickname: "",
            birthday: "",
            status: "",
            img: "",
            occupations: []
        })
        navigate('/home')
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
                    <form onSubmit={e=>handleSubmit(e)}>
                        
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
                            onChange={e => handleCheck(e)} />Alive</label> 
                        <label><input 
                            type="checkbox"
                            value="Deceased"
                            name="Deceased"
                            onChange={e => handleCheck(e)} />Deceased</label>  
                        <label><input 
                            type="checkbox"
                            value="Presumed dead"
                            name="Presumed dead"
                            onChange={e => handleCheck(e)} />Presumed dead</label>  
                        <label><input 
                            type="checkbox"
                            value="Unknown"
                            name="Unknown"
                            onChange={e => handleCheck(e)} />Unknown</label>  

                        <h4>Occupations:</h4>
                        <select onChange={e => handleSelect(e)}>
                            <option value="Occupations">Occupations</option>
                            {
                                occ.map(el => (
                                    <option value={el.name}>{el.name}</option>
                                ))
                            }
                        </select>         
                        <ul><li>{input.occupations.map(el => el + ". ")}</li></ul>
                        <div className={styles.containerBtnForm}>
                            <button type='submit'>Create</button>

                         </div> 
                
                    </form>
                </div>

                    
                    

            </div>


        </div>


    )

}