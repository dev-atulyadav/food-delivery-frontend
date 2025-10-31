import React from 'react'

const Title = ({children}) => {
    return (
        <h3 className='lg:text-4xl text-3xl font-extrabold my-10 lg:my-14 tracking-tight bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent'>{children}</h3>
    )
}

export default Title