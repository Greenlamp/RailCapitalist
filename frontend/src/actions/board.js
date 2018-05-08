import * as types from '../constants/ActionTypes'

export const addTotal = value => {
    return {
        type: 'ADD_TOTAL',
        value
    }
}
export const increment = () => ({ type: types.INCREMENT })