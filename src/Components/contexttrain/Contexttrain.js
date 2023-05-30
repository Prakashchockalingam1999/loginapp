import React from 'react'
import { Cont1 } from './Cont1'
import { Cont2 } from './Cont2'
import { useState, createContext } from 'react'
import { DataFetching } from './DataFetching'


export const Appcontext = createContext(null)

function Contexttrain() {
    const [name, setName] = useState("")
    
    function factorial(n) {
        if(n==1)
        return 1
        return n*factorial(n-1)
    }
    console.log(factorial(5))
    return (
        <div >
            <Appcontext.Provider  value={{name,setName}}>
            <Cont1 />
            <Cont2 />
            </Appcontext.Provider>
            <DataFetching/>
        </div>
    )
}
export default Contexttrain
