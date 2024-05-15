import { Routes, Route, BrowserRouter } from "react-router-dom"

import Graficos from "../pages/Graphics/index"
import CRUD from "../pages/CRUD/index"
import Home from "../pages/Home/index"

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/graficos" element={<Graficos />} />
                <Route path="/crud" element={<CRUD />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}