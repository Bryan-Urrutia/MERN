"use client"

import React, { useContext } from 'react'
import { useRouter } from 'next/navigation'
import { AuthContext } from '@/context/AuthContext';

function Navbar() {
    const router = useRouter();
    const { token, logoutUser } = useContext(AuthContext);
    return (
        <nav className='bg-red-500 w-full h-12 justify-between flex flex-row align-middle items-center text-center p-5'>
            <span onClick={() => { router.push("/") }}>Logo</span>
            <ul className='flex flex-row gap-5'>
                <li onClick={() => { router.push("/protected"); }} className='bg-slate-700 rounded p-2 cursor-pointer'>Protected</li>
                {token
                ? (<>
                    <li onClick={() => { logoutUser(); }} className='bg-slate-700 rounded p-2 cursor-pointer'>Logout</li>
                </>)
                : (<>
                    <li onClick={() => { router.push("/login") }} className='bg-slate-700 rounded p-2 cursor-pointer'>Login</li>
                    <li onClick={() => { router.push("/register") }} className='bg-slate-700 rounded p-2 cursor-pointer'>Register</li>
                </>)}

            </ul>
        </nav>
    )
}

export default Navbar