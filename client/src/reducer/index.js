const initialState = {
    characters: [],
    all: [],
    detail: []
}

function rootReducer (state= initialState, action) {
    switch(action.type) {
        case 'GET_CHARACTERS':
            return{
                ...state,
                characters: action.payload,
                all: action.payload
            }
        case 'GET_NAME_CHARACTER':
            return {
                ...state,
                characters: action.payload
            }
        case 'ORDER_BY_NAME':
            const orderByName = 
            action.payload === 'order' ?
            state.characters :
            action.payload === 'a-z' ? 
            state.characters.sort(function(a,b){
                if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                if(b.name.toLowerCase() > a.name.toLowerCase()) return -1;
                return 0;
                }) :
            state.characters.sort(function(a,b){
                if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                if(b.name.toLowerCase() > a.name.toLowerCase()) return 1;
                return 0;
                })
            return{
                ...state,
                payload: orderByName
            }
        case 'FILTER_BY_STATUS':
            const allCharacters = state.all
            const statusFiltered = 
                action.payload === "Status" ?
                allCharacters :
                allCharacters.filter(el => el.status === action.payload)


            return{
                ...state,
                characters: statusFiltered
            }
        case 'FILTER_BY_CREATE':
            const allC = state.all
            const createFiltered = 
                action.payload === "DB-Api" ?
                allC :
                action.payload === "Create" ?
                allC.filter(el => el.db === true) :
                allC.filter(el=> el.db !== true)

            return {
                ...state,
                characters: createFiltered
            }
        case "GET_DETAILS":
            return {
                ...state,
                detail: action.payload
            }
        default: return state

    }

}

export default rootReducer;