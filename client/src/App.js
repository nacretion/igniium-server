import React, {useState} from "react";
import {VisibleContext} from "./context";
import {BrowserRouter} from "react-router-dom";
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';


function noop() {
}

function App() {
    const {token, login, logout, userId} = useAuth()
    const isAuthenticated = !!token

    const routes = useRoutes(isAuthenticated)

    const [modalReport, setModalReport] = useState(false)
    const [modalSignIn, setModalSignIn] = useState(false)
    const [modalSignUp, setModalSignUp] = useState(false)
    const [modalShowPreview, setModalShowPreview] = useState(false)

    return (
        <div className="App">
            <VisibleContext.Provider value={{
                modalReport,
                setModalReport,
                modalSignIn,
                setModalSignIn,
                modalSignUp,
                setModalSignUp,
                modalShowPreview,
                setModalShowPreview,

                token,
                userId,
                login,
                logout,
                isAuthenticated
            }}>
                <BrowserRouter>
                    {routes}
                </BrowserRouter>
            </VisibleContext.Provider>
        </div>
    );
}

export default App;
