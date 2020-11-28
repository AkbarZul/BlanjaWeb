import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home'

export default function Router() {
    return (
        <BrowserRouter>
        <Route path="/" exact component={Home} />
        </BrowserRouter>
    )
}