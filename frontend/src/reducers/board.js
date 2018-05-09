import { shops } from '../fixture';
const initialState = {
    total:0,
    multiplicateur: 1,
    shops: shops
}

export default function board(state=initialState, action) {
    switch(action.type){
        case "INCREMENT":
            let total_somme = state.total + action.value
            return {
                ...state,
                total: total_somme
            }
        case "LEVEL_UP":
            let cout = 0
            shops.map((elm) => {
                if(elm.id === action.id){
                    cout = ((elm.niveau * elm.cout) *elm.mult).toFixed(2)*state.multiplicateur
                    return elm.niveau = elm.niveau + state.multiplicateur
                }else{
                    return elm
                }
            })
            return {
                ...state,
                total: state.total - cout
            }
        case "MULTIPLICATEUR":
            console.log(action.value)
            return {
                ...state,
                multiplicateur: action.value
            }
        default:
            return state
    }
}