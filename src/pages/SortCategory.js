import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import ProductCategory from '../components/Home/ProductCategory'

export default class SortCategory extends Component {
    render() {
        const { location } = this.props;
        return (
            <div>
                <Navbar />
                <ProductCategory ctg={location.search} />
            </div>
        )
    }
}
