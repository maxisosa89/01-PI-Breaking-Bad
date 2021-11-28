import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCharacters, getNameCharacter, orderByName, filterByStatus, filterByCreate } from "../actions/index";
import { Link } from 'react-router-dom';
import Paged from './Paged'
import Card from './Card'

export default function LandingPage(){

    const dispatch = useDispatch();
    const allCharacters = useSelector((state) => state.characters)
    const imageDefault = ""
    const [currentPage, setCurrentPage] = useState(1)
    const [charactersPerPage, setCharacterPerPage] = useState(9)
    const indexOfLastCharacter = currentPage * charactersPerPage
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage
    const currentCharacter = allCharacters.slice(indexOfFirstCharacter, indexOfLastCharacter)
    const [name, setName] = useState("")
    const [orderByN,setOrderByN] = useState('')

    const paged = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getCharacters())
    }, [dispatch])

    function handleClick (e){
        e.preventDefault();
        dispatch(getCharacters());
    }

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameCharacter(name))
        setName("")
    }

    function handleOrderByName (e){
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrderByN(e.target.value)

    }

    function handleFilterStatus (e){
        dispatch(filterByStatus(e.target.value))
    }

    function handleFilterCreate(e){
        dispatch(filterByCreate(e.target.value))
    }
    
    return (
        <div>

            <nav>
                
                <Link to = '/'>
                    <h3>Breaking Bad</h3>
                </Link>

                <button onClick={e => {handleClick(e)}}>Refresh</button>

                <input type="text" placeholder="Search character..." onChange={(e) => handleInputChange(e)} />
                <button type='submit' onClick={(e) => handleSubmit(e)}>Search</button>

                <Link to = "/character">
                    <h3>Create your character!</h3>
                </Link>

            </nav>


            <div>

                <select onChange={e => {handleOrderByName(e)}}>
                    <option value="order">Order By</option>
                    <option value="a-z">A-Z</option>
                    <option value="z-a">Z-A</option>
                </select>

                <select onChange={e => {handleFilterStatus(e)}}>    
                    <option value="Status" >Status</option>
                    <option value="Alive" >Alive</option>
                    <option value="Deceased" >Deceased</option>
                    <option value="Presumed dead" >Presumed dead</option>
                    <option value="Unknown" >Unknown</option>
                </select>

                <select onChange={e => {handleFilterCreate(e)}}>    
                    <option value="DB-Api" >DB-Api</option>
                    <option value="Create" >Create</option>
                    <option value="Existent" >Existent</option>
                </select>

            </div>

            <Paged 
                charactersPerPage={charactersPerPage}
                allCharacters={allCharacters.length}
                paged={paged}
            />


            {
                currentCharacter?.map(e=>{
                    return (
                        <div>
                            <Link to = {"/character/" + e.char_id}>
                                <Card 
                                    name={e.name}
                                    nickname={e.nickname}
                                    img={e.img}
                                />
                            </Link>
                        </div>
                    )
                })
            }


        </div>
    )
}