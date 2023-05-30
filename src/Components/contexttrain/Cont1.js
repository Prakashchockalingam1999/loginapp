import React from 'react'
import { useContext } from 'react'

import { Appcontext } from './Contexttrain'

export const Cont1 = () => {

    const { setName } = useContext(Appcontext)
    return (
        <div>
            <input type='text ' placeholder='Name' onChange={(e) => setName(e.target.value)} />
        </div>
    )
}
