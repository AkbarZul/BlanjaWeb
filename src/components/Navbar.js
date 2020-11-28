import React, { useState } from 'react'
import { Logo } from '../assets/style';



// class Navbar extends Component {
    const Navbar = () => {
        const [isNavCollapsed, setIsNavCollapsed] = useState(true);
        const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
        return (
            <div>
                <div className="shadow p-3 mb-5 bg-white rounded">
                    <nav className="navbar navbar-expand-lg navbar-light bg-white">
                        <div className="container">
                            <div className="logo-brand">
                                <img src={ Logo } alt="logo-shop"/>
                                <h1>Blanja</h1>
                            </div>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div class={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarSupportedContent">
                            <div className="form-input">
                                <input type="text" name="" id="search" placeholder="Search"/>
                                <button className="btn my-2 my-sm-2 far fa-search icon" type="submit"></button>
                            </div>
                            <button className="btn my-2 my-sm-0 fal fa-filter filter" type="submit"></button>
                            <div className="navbar-nav ml-auto"></div>
                                <div className="shopping">
                                    <button className="btn my-2 my-sm-2 my-md-2 far fa-shopping-cart" id="shopping" type="submit"></button>
                                </div>
                                <div className="login">
                                    <button type="submit" className="btn-login btn my-2 my-sm-2">Login</button>
                                </div>
                                <div className="signup">
                                    <button type="submit" className="btn-signup btn my-2 my-sm-2">Sign Up</button>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        )
}

export default Navbar