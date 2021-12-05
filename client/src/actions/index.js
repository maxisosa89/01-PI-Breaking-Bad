import axios from "axios";

export function getCharacters() {
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/characters",{})
        return dispatch ({
            type: "GET_CHARACTERS",
            payload: json.data
        })
    }
}

export function getNameCharacter(payload) {
    return async function(dispatch){
        try {
            let json = await axios.get('http://localhost:3001/characters?name=' + payload)
            return dispatch({
                type: 'GET_NAME_CHARACTER',
                payload: json.data
            })
        } catch (err){
            console.log("Not found")
        }
    }

}

export function orderByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function filterByStatus(payload){
    return {
        type: 'FILTER_BY_STATUS',
        payload
    }
}

export function filterByCreate(payload){
    return {
        type: 'FILTER_BY_CREATE',
        payload
    }
}

export function getDetail(payload){
    return async function (dispatch){
        try {
            const json = await axios.get("http://localhost:3001/character/" + payload)
            return dispatch({
                type: "GET_DETAILS",
                payload: json.data
            })
        } catch(err){
            console.log("Id not found")
        }
    }
}

export function getOccupations() {
    return async function (dispatch){
        try{
            const info = await axios.get('http://localhost:3001/occupations', {})
            return dispatch({
                type: "GET_OCCUPATIONS",
                payload: info.data
            })
        }catch(err){
            console.log("Error")
        }
    }
}

export function postCharacter(payload) {
    return async function(dispatch){
        const info = await axios.post("http://localhost:3001/character", payload)
        console.log("OCC")
        console.log(payload)
        return info
    }
}