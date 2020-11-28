import React, { Component } from 'react'
import {TShirt, Shorts, Jacket, Pants, Shoes} from '../../assets/style'


export default class Category extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <div className="title-category" style={{'margin' : "30px 0px"}}>
                            <h3>Category</h3>
                            <p className="lead text-muted">What are you currently looking for</p>
                        <div className="row row-cols-5 d-flex justify-content-around" style={{'padding' : "30px 0px"}}>
                            <div className="col col-md-auto col-12 rounded box brand-category mb-5">
                                <img src={TShirt} alt="" className="fluid mx-auto d-block"/>
                                <h3>T-Shirt</h3>
                            </div>
                            <div className="col col-md-auto col-12 rounded box brand-category-1 mb-5">
                                <img src={Shorts} alt="" className="fluid mx-auto d-block"/>
                                <h3>Shorts</h3>
                            </div>
                            <div className="col col-md-auto col-12 rounded box brand-category-2 mb-5">
                                <img src={Jacket} alt="" className="fluid mx-auto d-block"/>
                                <h3>Jacket</h3>
                            </div>
                            <div className="col col-md-auto col-12 rounded box brand-category-3 mb-5">
                                <img src={Pants} alt="" className="fluid mx-auto d-block"/>
                                <h3>Pants</h3>
                            </div>
                            <div className="col col-md-auto col-12 rounded box brand-category-4 mb-5">
                                <img src={Shoes} alt="" className="fluid mx-auto d-block"/>
                                <h3>Shoes</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


