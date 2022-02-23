import React from "react"
import {Navigate, Route, Routes} from "react-router-dom";
import Feed from "./pages/Feed";
import Create from "./pages/Create";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

const routes = [
    <Route exact path="/" element={<Feed/>}/>,
    <Route exact path="/Feed" element={<Navigate to="/"/>}/>,
    <Route path="*" element={<NotFound/>}/>
]

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route exact path="/create" element={<Create/>}/>
                <Route exact path="/profile" element={<Profile/>}/>
                {routes}
            </Routes>
        )
    } else {
        return (
            <Routes>
                {routes}
            </Routes>
        )
    }
}