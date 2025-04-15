import {Route, Routes} from 'react-router-dom'
import { Login } from '.'


export function MainRoutes(){
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
        </Routes>
    )
}