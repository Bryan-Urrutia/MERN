'use client'
import { AuthContext } from '@/context/AuthContext'
import React, { useContext, useEffect } from 'react'


function page() {
    const { connectedUser } = useContext(AuthContext);

    useEffect(() =>{
        connectedUser();
    },[])

    return (
        <div>
            ruta protegida
        </div>
    )
}

export default page