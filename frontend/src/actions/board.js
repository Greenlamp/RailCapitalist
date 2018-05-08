export const addTotal = value => {
    return {
        type: 'ADD_TOTAL',
        value
    }
}

export const getTotal = value => {
    return {
        type: 'GET_TOTAL'
    }
}

export const increment = () => {
    return {
        type: 'INCREMENT'
    }
}