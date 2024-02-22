"use client"
import { AuthContext } from '@/context/AuthContext';
import React, { useContext } from 'react'

function Register() {
    const Google = async () => {
        window.open(`${baseUrl}google/callback`, '_self');
    }

    const Microsoft = async () => {
        window.open(`${baseUrl}microsoft/callback`, '_self');
    }

    const {
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading
    } = useContext(AuthContext);

    return (
        <div className='flex flex-row gap-2'>
            <div className='flex flex-col gap-2'>
                <a className="enlace" onClick={Google}>Registrarse con Google</a>
                <a className="enlace" onClick={Microsoft}>Registrarse con Microsoft</a>
            </div>
            <form className='flex flex-col gap-2 text-black' onSubmit={registerUser}>
                <input type='name' placeholder='name' onChange={(e) => updateRegisterInfo({ ...registerInfo, name: e.target.value })} />
                <input type='email' placeholder='email' onChange={(e) => updateRegisterInfo({ ...registerInfo, email: e.target.value })} />
                <input type='password' placeholder='password' onChange={(e) => updateRegisterInfo({ ...registerInfo, password: e.target.value })} />
                <button type='submit' className='bg-white text-black p-2 rounded'>
                    {isRegisterLoading ? "Registrandose" : "Registrarse"}
                </button>
                {registerError && <span className='bg-red-600'><p>{registerError.message}</p></span>}
            </form>
        </div>
    )
}

export default Register