import {useState, createContext, useContext, useEffect} from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const userData = localStorage.getItem('user')
        try {
            const userObject = JSON.parse(userData)
            if (userObject) {
                setUser(userObject)
            }
        } catch {}

    }, [])



    const setCurrentUser = user => {
        localStorage.setItem('user', JSON.stringify(user))
        setUser(user)
    }

    return (
        <AuthContext.Provider value={{ user, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}