import { Routes, Route } from "react-router-dom"
import { DefaultLayout } from "./layout/Default.layout"

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
            </Route>
        </Routes>
    )
}