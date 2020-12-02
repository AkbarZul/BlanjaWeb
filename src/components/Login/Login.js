import React, { Component } from 'react'
// import { Button } from 'react-bootstrap'
import { Logo } from '../../assets/style/index'
import '../../assets/style/login.css'

export default class Login extends Component {
    render() {
        return (
            <>
                <section className="home-page">
                <div id="logo">
                        <div className="logo-shop">
                            <img src={Logo} alt="logo-shop"/>
                        </div>
                        <div className="logo-text">
                            <p className="tag-logo">Blanja</p>
                        </div>
                    </div>
                    <h4 className="tag-h4">Please login with your account</h4>
                    <div className="button">
                        <div className="customer-seller">
                            <button className="customer">
                            Customer
                            </button>
                            <button className="seller">
                            Seller
                            </button>
                        </div>
                    </div>
                    <form action="">
                        <input type="email" name="email" id="email" placeholder="Email"/>
                        <br/>
                        <input type="password" name="password" id="password" placeholder="Password"/>
                    </form>
                    <div className="forgot-password">
                        <a href="reset-password" style={{textDecoration:'none'}}>Forgot password?</a>
                    </div>
                    <div className="button-primary" >
                        <button type="button" className="btn-primary" style={{backgroundColor: 'rgba(219, 48, 34, 1)', border: '2px solid rgba(219, 48, 34, 1)'}}><a href="/" style={{textDecoration:'none'}}>Primary</a></button>
                    </div>
                    <p className="text-register">Don't have a Tokopedia account? <a href="register" style={{textDecoration:'none'}}>Register</a></p>
                </section>   
            </>
        )
    }
}
