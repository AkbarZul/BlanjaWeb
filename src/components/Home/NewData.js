import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Jas, StarRate } from '../../assets/style'
import axios from 'axios';
const getUrl = "http://localhost:8000/products";


class NewData extends Component {
    state ={
        products: [],
    }

    getAllProducts = () => {
        axios.get(getUrl).then(({data}) => {
            this.setState({
                products: data.data,
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
            {products.map(({id, product_name, product_price, category_name, product_brand}) => {
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
                    <p className="card-text">{product_price}</p>
                    <p className="card-text1">{category_name}</p>
                    <p className="card-text2">{product_brand}</p>
                       <div className="star">
                            <img src={StarRate} alt=""/>
                       </div>
                    </div>
                </Card>
                    );
                })}
                
            </>
        )
    }
}

export default NewData