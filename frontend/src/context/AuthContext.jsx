import { baseUrl, getRequest, postRequest } from "@/utils/services";
import { useRouter } from 'next/navigation'
import { createContext, useCallback, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const router = useRouter();
    const [token, setToken] = useState("");
    //Login
    const [loginError, setLoginError] = useState(null)
    const [isLoginLoading, setIsLoginLoading] = useState(null)
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    })

    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setToken(token);
            router.push("/protected ")
        }
    }, []);


    useEffect(() => {
        // Función para obtener el token de las cookies
        const getTokenFromCookie = () => {
          const cookies = document.cookie.split(';');
          for (let cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === 'token') {
              return value.replace(/%20/g, ' ');
            }
          }
          return '';
        };

        const token = getTokenFromCookie();
        if (token) {
            setToken(token);
            router.push("/protected ")
        }
      }, []);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        localStorage.setItem("token",token);
        setToken(token);
    }, []);

    const connectedUser = useCallback(async () =>{
        const verify = async () =>{
            const response = await getRequest(`${baseUrl}local/protected`, token);
            console.log(response);
        }
        
        if (token) {
            verify();
        }else{
            router.push("/login")
        }
    },[token])

    const loginUser = useCallback(async (e) => {
        e.preventDefault()
        setIsLoginLoading(true)
        setLoginError(null)

        const response = await postRequest(`${baseUrl}local/login`, JSON.stringify(loginInfo))

        if (response.error) {
            return setLoginError(response);
        }
        
        localStorage.setItem("token", response.token);
        setToken(response.token);
        setIsLoginLoading(false);
        router.push('/protected')
    }, [loginInfo])

    //Register
    const [registerError, setRegisterError] = useState(null)
    const [isRegisterLoading, setIsRegisterLoading] = useState(null)
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: ""
    })

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);

    const registerUser = useCallback(async (e) => {
        e.preventDefault()
        setIsRegisterLoading(true)
        setRegisterError(null)

        const response = await postRequest(`${baseUrl}local/register`, JSON.stringify(registerInfo))

        if (response.error) {
            return setRegisterError(response);
        }
        localStorage.setItem("token", response.token);
        setToken(response.token);
        setIsRegisterLoading(false)
        router.push('/protected')
    }, [registerInfo])

    const logoutUser = useCallback(() => {
        localStorage.removeItem("token");
        setToken(null);
        router.push("/login");
    }, [])


    return (
        <AuthContext.Provider
            value={{
                loginUser,
                loginError,
                loginInfo,
                updateLoginInfo,
                isLoginLoading,
                registerInfo,
                updateRegisterInfo,
                registerUser,
                registerError,
                isRegisterLoading,
                logoutUser,
                token,
                connectedUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}