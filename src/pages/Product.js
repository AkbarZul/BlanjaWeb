import React, { Component } from 'react'
import axios  from 'axios'
import ProductName from '../components/Product/ProductName';
const getUrl = "http://localhost:8000/product/";


export default  class Product extends Component {
    state ={
        product: [],
    }

    getSingleProduct = () => {
        const { match } = this.props;
        axios
          .get(getUrl + match.params.id)
          .then(({data}) => {
            this.setState({
                product: data.data,
            })
          })
          .catch((err) => {
            console.log(err);
          });
      };
    
      componentDidMount = () => {
        this.getSingleProduct();
      };

    render() {
        console.log(this.state.product)
        return (
            <>
                
                <ProductName name={this.state.product.map(product => {return product.product_name})} 
                brand={this.state.product.map(product => {return product.product_brand})} 
                desc={this.state.product.map(product => {return product.product_description})} 
                price={this.state.product.map(product => {return product.product_price})}
                condition={this.state.product.map(product => {return product.product_condition})}
                category={this.state.product.map(product => {return product.category_name})} 
                 />
               
            </>
        )
    }
}