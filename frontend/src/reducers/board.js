const initialState = {
    total:0
}

export default function board(state=initialState, action) {
    switch(action.type){
        case "INCREMENT":
            return {
                total: state.total + action.value
            };
        default:
            return state
    }
}