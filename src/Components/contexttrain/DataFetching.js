import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'


const initialState = {
    loading: true,
    error: "",
    post: {}
}

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_SUCCESS":
            return {
                loading: false,
                post: action.payload,
                error: "",
            }
        case "FETCH_ERROR":
            return {
                loading: false,
                post: {},
                error: "SOMETHING WENT WRONG",
            }
    }
}
export const DataFetching = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [query, setquery] = useState()


    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then(res => {
                dispatch({ type: "FETCH_SUCCESS", payload: res.data })
                console.log(res.data)
            })
            .catch(res => {
                dispatch({ type: "FETCH_ERROR" })
            })
    }, [])



    return (
        <div>

            <input type='text' placeholder='search...' onChange={(e) => setquery(e.target.value)} />
            {state.loading ? "loading" : state.post.filter(item => item.name.toLowerCase().includes(query))
                .map((item) => (<p key={item.id}>{item.name}</p>))}
            {state.error ? state.error : null}

        </div>
    )
}
