const initialState = {
    total:0
}

export default function board(state=initialState, action) {
    switch(action.type){
        case "INCREMENT":
            return {
                total: state.total + 1
            };
        default:
            return state
    }
}