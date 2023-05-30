import React, { useState } from 'react'
import { useContext } from 'react'
import { Appcontext } from './Contexttrain'
import { useReducer } from 'react'


const initialState = {
    firstCounter: 0,
    secondCounter: 5
}
const reducer = (state, action) => {
    switch (action.type) {
        case "increament":
            return { ...state, firstCounter: state.firstCounter + action.value };
        case "decreament":
            return { ...state, firstCounter: state.firstCounter - action.value };
        case "increament2":
            return { ...state, secondCounter: state.secondCounter + action.value };
        case "decreament2":
            return { ...state, secondCounter: state.secondCounter - action.value };
        case "reset":
            return initialState
        default:
            return state
    }

}
export const Cont2 = () => {

    const { name } = useContext(Appcontext)
    const [count, dispatch] = useReducer(reducer, initialState)

    return (
        <div>
            Name:{name}

            <div>{count.firstCounter}</div>
            <div>{count.secondCounter}</div>
            <button onClick={() => dispatch({ type: 'increament', value: 1 })}>increament</button>
            <button onClick={() => dispatch({ type: 'decreament', value: 1 })}>decreament</button>
            <button onClick={() => dispatch({ type: 'increament2', value: 5 })}>increament5</button>
            <button onClick={() => dispatch({ type: 'decreament2', value: 5 })}>decreament5</button>
            <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>



        </div>
    )
}
