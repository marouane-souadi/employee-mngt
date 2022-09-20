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
import UploadCSV from "./components/UploadCSV";
import EditEmployee from "./pages/EditEmployee";
import EmployeeDetail from "./pages/EmployeeDetail";

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
                            <Route path="/employees/import-csv" element={<RequireAuth><UploadCSV/></RequireAuth>}/>
                            <Route path="/employees/:id/edit" element={<RequireAuth><EditEmployee/></RequireAuth>}/>
                            <Route path="/employees/:id" element={<RequireAuth><EmployeeDetail/></RequireAuth>}/>
                            <Route path="*" element={<RequireAuth><Home/></RequireAuth>}/>
                        </Routes>
                    </Router>
                </div>
            </div>
        </AuthProvider>
    )
}

export default App;
