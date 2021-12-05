import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postCharacter, getOccupations } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import styles from './styles/Form.module.css'

let checkValidator = false;

function validate(input) {
    let errors = {};
    if (!input.name || !input.nickname || !input.birthday || !input.status){
        errors.error = "Complete the fields with *"
    }
    return errors;
}

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
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleCheck(e) {        
        if (e.target.checked) {
            if(checkValidator) {
                e.target.checked = false;
                return alert("Only one choice!")
            }
            checkValidator = true;
            setInput({
                ...input,
                status: e.target.value
            })
        } else {
            checkValidator = false;
            setInput({
                ...input,
                status: ""
            })
        }
    }

    function handleSelect(e) {
        if(!input.occupations.includes(e.target.value)){
            setInput({
                ...input,
                occupations: [...input.occupations, e.target.value]
            })
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (input.name && input.nickname && input.birthday && input.status){
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
            checkValidator = false;
            navigate('/home')
        } else {
            alert("Complete the fields with *")
        }
    }

    function handleDelete(e){
        setInput({
            ...input,
            occupations: input.occupations.filter(el => el !== e)
        })
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
                        <div className={styles.containerLeftBox}>
                            <div>
                                <h4>Name*:</h4>
                                <input 
                                    type="text"
                                    value={input.name}
                                    name="name"
                                    onChange={e => handleChange(e)}
                                    autocomplete="off"/>
                            </div>
                            <div>
                                <h4>Nickname*:</h4>
                                <input 
                                    type="text"
                                    value={input.nickname}
                                    name="nickname"
                                    onChange={e => handleChange(e)}
                                    autocomplete="off" />        
                            </div>
                            <div>
                                <h4>Birthday*:</h4>
                                <input 
                                    type="text"
                                    value={input.birthday}
                                    name="birthday"
                                    onChange={e => handleChange(e)}
                                    autocomplete="off" />
                            </div>
                            <h4>Image URL:</h4>
                            <input 
                                type="text"
                                value={input.img}
                                name="img"
                                onChange={e => handleChange(e)}
                                autocomplete="off" />
                        </div>
                        <div className={styles.containerRightBox}>
                                <h4>Status*:</h4>
                            <div className={styles.containerStatusForm}>
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
                            </div>
                            <h4>Occupations:</h4>
                            <select onChange={e => handleSelect(e)}>
                                <option value="Occupations">Occupations</option>
                                {
                                    occ.map(el => (
                                        <option value={el.name}>{el.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className={styles.containerBtnForm}>
                            <button type='submit' className={styles.btnCreateForm}>Create</button>
                            {
                                errors.error && (
                                    <p>{errors.error}</p>
                                )
                            }
                         </div> 
                    </form>
                    <div>
                        <h4>Occupations selected:</h4>
                        <ul className={styles.ulForm}>
                            {
                                input.occupations.map(el => (
                                    <li>{el}<button type="button" onClick={() => handleDelete(el)} className={styles.btnXForm}>X</button></li>
                                ))
                            }         
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}