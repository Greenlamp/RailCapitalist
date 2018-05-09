import * as types from '../constants/ActionTypes'

export const addTotal = value => {
    return {
        type: 'ADD_TOTAL',
        value
    }
}
export const increment = (value) => ({ type: types.INCREMENT, value: value })
export const incrementByOne = () => ({ type: types.INCREMENT, value: 1 })