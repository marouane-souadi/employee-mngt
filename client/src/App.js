import './App.css';
import {AuthProvider, useAuth} from "./hooks/auth";
import {useEffect} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {RequireGuest} from "./hoc/RequireGuest";
import {RequireAuth} from "./hoc/RequireAuth";
import NavBar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddEmployee from "./pages/AddEmployee";

function App() {
    const auth = useAuth()

    useEffect(() => {
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            console.log(user)
            auth.setCurrentUser(user)
        } catch {
        }
    }, [])

    return (
        <AuthProvider>
            <div className="container">
                <div id="app">
                    <Router>
                        <NavBar/>
                        <Routes>
                            <Route path="/register" element={<RequireGuest><Register/></RequireGuest>}/>
                            <Route path="/login" element={<RequireGuest><Login/></RequireGuest>}/>
                            <Route path="/employees/add" element={<RequireAuth><AddEmployee/></RequireAuth>}/>
                            <Route path="*" element={<RequireAuth><Home/></RequireAuth>}/>
                        </Routes>
                    </Router>
                </div>
            </div>
        </AuthProvider>
    )
}

export default App;
