import React, { Component } from 'react';
import axios from 'axios';
// import PropTypes from "prop-types";
// import { withRouter } from "react-router"
import Navbar from '../Navbar';
import Newdata from '../Home/NewData';
import { StarRate } from '../../assets/style';

// import { Button} from 'react-bootstrap'
import '../../assets/style/product.css'

export default class ProductName extends Component {

    CreateProduct = async event => {
        event.preventDefault();
        
        await axios.post(`http://localhost:8000/transaksi`)
        .then(res => {
            console.log(res)
            console.log(res.data)
        })
    }
    render() {
        const { name, price, brand, condition, desc, category } = this.props;
        return (
            <div>
                <Navbar/>
                <div className="container">
                    <div className="row">
                        <div className="col-5">
                <img className="img-fluid rounded" src="https://s3-alpha-sig.figma.com/img/f7d2/c4fa/7f2d62af5d36bfc5853b20faa7ee8c79?Expires=1607904000&Signature=EzLGwgrAh4sBPx1uZUAm1~kXhDPavU2Z3Hgnj7XxKqRx1Xb9hV3-LkRmcpdHt0~oaaC801u8iVn0s~ljXhL6w4ouwou6Z9kCZT9xQZkm8jGdL7ZOYQMzD4fNRbpJUQVYmnZhh5fPs3EkDbM4JSr97cfHD6U84NclHaHU6fy1s~k1HKrS9ft76YJbxfU5-i1h0NcfYQw7JgxGQWaRJLNR-6P4LBq5iFZvg3EYRQR4jA2OebrB50DbDuVKVptg97QGN6u6utaqT6z4pCXhERptJWOhA8xC~KBQmz8h-d9lkv6k-6Dgjzc5w4-1HADL~yZtHc~s2SdCBYbZprWusHbZzw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="" />
                <div className="d-flex">
                    <img className="img-fluid rounded mt-2" src="https://s3-alpha-sig.figma.com/img/53a0/1ccb/2a1aae624033dccdef99e3a2279b99d3?Expires=1607904000&Signature=TmqaRevfXD~m372wHwjMq~~71RZVvw4yQRPxMLo4-nHXRL9e-8PymgynHDSK9wbiCKGKROALIDpI3VsrNQ0LyKfsErrEUBaoJixN3T0x1ugH7sdZCoTQDNEVAr2Hg6Sj~v4SpvRBR8LT9EUqb-Js9mNgAmTE-6jHVa4mxv2YywNFjsDeIzYf5VIxcIfcBtXfQduL5RD1Ywwt95O0qJAGpr3N9OaOYIZrPi6Hcro3lQ3dclnT89lPoml2fGSYp4-ldHbhiuxENfTtNdJ7eMuzvCI0J6nHGvzzwQPVrUQEdRrsBxJKykIjZgIn-1480V686ZQpPap4qM2jqf9Yvl~Bng__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="img" style={{width: "20%", margin: "1px"}}></img>
                    <img className="img-fluid rounded mt-2" src="https://s3-alpha-sig.figma.com/img/53a0/1ccb/2a1aae624033dccdef99e3a2279b99d3?Expires=1607904000&Signature=TmqaRevfXD~m372wHwjMq~~71RZVvw4yQRPxMLo4-nHXRL9e-8PymgynHDSK9wbiCKGKROALIDpI3VsrNQ0LyKfsErrEUBaoJixN3T0x1ugH7sdZCoTQDNEVAr2Hg6Sj~v4SpvRBR8LT9EUqb-Js9mNgAmTE-6jHVa4mxv2YywNFjsDeIzYf5VIxcIfcBtXfQduL5RD1Ywwt95O0qJAGpr3N9OaOYIZrPi6Hcro3lQ3dclnT89lPoml2fGSYp4-ldHbhiuxENfTtNdJ7eMuzvCI0J6nHGvzzwQPVrUQEdRrsBxJKykIjZgIn-1480V686ZQpPap4qM2jqf9Yvl~Bng__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="img" style={{width: "20%", margin: "1px"}}></img>
                    <img className="img-fluid rounded mt-2" src="https://s3-alpha-sig.figma.com/img/53a0/1ccb/2a1aae624033dccdef99e3a2279b99d3?Expires=1607904000&Signature=TmqaRevfXD~m372wHwjMq~~71RZVvw4yQRPxMLo4-nHXRL9e-8PymgynHDSK9wbiCKGKROALIDpI3VsrNQ0LyKfsErrEUBaoJixN3T0x1ugH7sdZCoTQDNEVAr2Hg6Sj~v4SpvRBR8LT9EUqb-Js9mNgAmTE-6jHVa4mxv2YywNFjsDeIzYf5VIxcIfcBtXfQduL5RD1Ywwt95O0qJAGpr3N9OaOYIZrPi6Hcro3lQ3dclnT89lPoml2fGSYp4-ldHbhiuxENfTtNdJ7eMuzvCI0J6nHGvzzwQPVrUQEdRrsBxJKykIjZgIn-1480V686ZQpPap4qM2jqf9Yvl~Bng__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="img" style={{width: "20%", margin: "1px"}}></img>
                    <img  className="img-fluid rounded mt-2" src="https://s3-alpha-sig.figma.com/img/53a0/1ccb/2a1aae624033dccdef99e3a2279b99d3?Expires=1607904000&Signature=TmqaRevfXD~m372wHwjMq~~71RZVvw4yQRPxMLo4-nHXRL9e-8PymgynHDSK9wbiCKGKROALIDpI3VsrNQ0LyKfsErrEUBaoJixN3T0x1ugH7sdZCoTQDNEVAr2Hg6Sj~v4SpvRBR8LT9EUqb-Js9mNgAmTE-6jHVa4mxv2YywNFjsDeIzYf5VIxcIfcBtXfQduL5RD1Ywwt95O0qJAGpr3N9OaOYIZrPi6Hcro3lQ3dclnT89lPoml2fGSYp4-ldHbhiuxENfTtNdJ7eMuzvCI0J6nHGvzzwQPVrUQEdRrsBxJKykIjZgIn-1480V686ZQpPap4qM2jqf9Yvl~Bng__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="img" style={{width: "20%", margin: "1px"}}></img>
                    <img  className="img-fluid rounded mt-2" src="https://s3-alpha-sig.figma.com/img/53a0/1ccb/2a1aae624033dccdef99e3a2279b99d3?Expires=1607904000&Signature=TmqaRevfXD~m372wHwjMq~~71RZVvw4yQRPxMLo4-nHXRL9e-8PymgynHDSK9wbiCKGKROALIDpI3VsrNQ0LyKfsErrEUBaoJixN3T0x1ugH7sdZCoTQDNEVAr2Hg6Sj~v4SpvRBR8LT9EUqb-Js9mNgAmTE-6jHVa4mxv2YywNFjsDeIzYf5VIxcIfcBtXfQduL5RD1Ywwt95O0qJAGpr3N9OaOYIZrPi6Hcro3lQ3dclnT89lPoml2fGSYp4-ldHbhiuxENfTtNdJ7eMuzvCI0J6nHGvzzwQPVrUQEdRrsBxJKykIjZgIn-1480V686ZQpPap4qM2jqf9Yvl~Bng__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="img" style={{width: "20%", margin: "1px"}}></img>
                </div>
                </div>
                <div className="col-7">
                    <h3 className="name">{ name }</h3>
                    <p className="brand">{ brand }</p>
                    <img src={ StarRate } className="mb-5" alt="..."/>
                        <h3 className="tag-price">Price</h3>
                        <p className="price">{ price }</p>
                    <h3 className="color">Color</h3>
                    <button className="black mr-3"></button>
                    <button className="red mr-3"></button>
                    <button className="blue mr-3"></button>
                    <button className="green "></button>
                    <div className="d-flex">
                        <p className="tag-size mr-5 mt-5">Size</p>
                        <p className="tag-total mt-5 ml-5">Jumlah</p>
                    </div>
                
                <div className="d-flex">
                <button className="minus mr-2">
                    <p>-</p>
                </button>
                <p className="number mt-2">28</p>
                <button className="plus ml-2">
                    <p>+</p>
                </button>
                <button className="minus2 mr-2">
                    <p>-</p>
                </button>
                <p className="number mt-2">1</p>
                <button className="plus ml-2">
                    <p>+</p>
                </button>
                </div>
                <div className="d-flex">
                <button className="chat mt-3 rounded-pill">
                    Chat
                </button>
                <button className="mybag ml-2 mt-3 rounded-pill">
                    Add bag
                </button>
                <button className="buy ml-2 mt-3 rounded-pill" onClick={this.CreateProduct}>
                    Buy Now
                </button>
                </div>
                
                </div>
                </div>
                <h3 className="informasi">Informasi Produk</h3>
                <h3 className="tag-condition mt-5">Condition</h3>
                <p className="condition">{ condition }</p>
                <h3 className="tag-category mt-4">Category</h3>
                <p className="category-product">{ category }</p>
                <h3 className="tag-desc">Description</h3>
                <p className="desc">{ desc }</p>
                <p className="informasi">Product review</p>
                <div className="d-flex">
                    <p className="rate">5.0</p>
                    <p className="five">/5</p>
                </div>
                <div className="star">
                    <i className="fas fa-star text-warning"></i>
                    <i className="fas fa-star text-warning"></i>
                    <i className="fas fa-star text-warning"></i>
                    <i className="fas fa-star text-warning"></i>
                    <i className="fas fa-star text-warning"></i>
                </div>
                <section>
            <hr />
            <h2 className="part-section mt-5">You can also like this</h2>
            <p>You’ve never seen it before!</p>
        
    </section>

    <article>
        
            <div className="row d-flex flex-row justify-content-center">
                <Newdata />
            </div>
        
    </article>

                
                </div>
            </div>
        )
    }
}

