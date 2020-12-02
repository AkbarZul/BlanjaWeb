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
      if(this.state.product[0]) {
        console.log(this.state.product[0].product_name)
      }
        return (
            <>
                {this.state.product[0] && (
                  <ProductName name={this.state.product[0].product_name} 
                  brand={this.state.product[0].product_brand} 
                  desc={this.state.product[0].product_description} 
                  price={this.state.product[0].product_price}
                  condition={this.state.product[0].product_condition}
                  size={this.state.product[0].product_size}
                  qty={this.state.product[0].product_qty}
                   />
                )}
                
               
            </>
        )
    }
}