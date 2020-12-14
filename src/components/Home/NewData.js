import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Jas } from '../../assets/style'
import Rating from '../Rating/Rating'
import axios from 'axios';
const getUrl = "http://localhost:8000/products";

class NewData extends Component {
    state ={
        products: [],
    }

    getAllProducts = () => {
        axios.get(getUrl, {
            params: {
                sort: "sort-terbaru",
                sortDesc: "sort-desc",
            }
        })
        .then(({data}) => {
            this.setState({
                products: data.data.products,
            })
        }).catch(err => {
            console.log(err)
        })
    }

    componentDidMount = () => {
        this.getAllProducts()
    }
    render() {
        const {products} = this.state;
            console.log(this.state.products)
        return (
            <>
            {products.map(({id, product_name, product_price, product_brand, product_rating}) => {
                    return (
                        <Card className="card-style" style={{width: "18rem"}} key={id}>
                           <Link to={{
                               pathname:`/product/${id}`,
                               state: this.state,
                           }}>
                           <img src={Jas} className="card-img-top" alt="..."/>
                           </Link>
                    <div className="card-body">
                       <h5 className="card-title">{product_name}</h5>
                    <p className="card-text">Rp. {product_price}</p>
                    <p className="card-text2">{product_brand}</p>
                    <Rating product_rating={product_rating} />
                    </div>
                </Card>
                    );
                })}
                
            </>
        )
    }
}

export default NewData