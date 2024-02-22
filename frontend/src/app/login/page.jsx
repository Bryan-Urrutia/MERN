"use client"
import { AuthContext } from '@/context/AuthContext';
import { baseUrl } from '@/utils/services'
import React, { useContext, useState } from 'react'

function Login() {
    const Google = async () => {
        window.open(`${baseUrl}google/callback`, '_self');
    }

    const Microsoft = async () => {
        window.open(`${baseUrl}microsoft/callback`, '_self');
    }

    const {
        loginUser,
        loginError,
        loginInfo,
        updateLoginInfo,
        isLoginLoading
    } = useContext(AuthContext);

    return (
        <div className='flex flex-row gap-2'>
            <div className='flex flex-col gap-2'>
                <a className="enlace" onClick={Google}>Iniciar con Google</a>
                <a className="enlace" onClick={Microsoft}>Iniciar con Microsoft</a>
            </div>
            <form className='flex flex-col gap-2 text-black' onSubmit={loginUser}>
                <input type='email' placeholder='email' onChange={(e) => updateLoginInfo({ ...loginInfo, email: e.target.value })} />
                <input type='password' placeholder='password' onChange={(e) => updateLoginInfo({ ...loginInfo, password: e.target.value })} />
                <button type='submit' className='bg-white text-black p-2 rounded'>
                    {isLoginLoading ? "Ingresando" : "Ingresar"}
                </button>
                {loginError && <span className='bg-red-600'><p>{loginError.message}</p></span>}
            </form>
        </div>
    )
}

export default Login