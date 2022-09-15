import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/auth'

export const RequireGuest = ({ children }) => {

    const auth = useAuth()

    if (auth.user) {
        return <Navigate to='/'/>
    }

    return children
}