import React, { Component } from 'react'
import { Image1, Image2, Image3, Image4 } from '../../assets/style'
import Carousel from 'react-bootstrap/Carousel'

class Carousell extends Component {
    render() {
        return (
            <div>
                <div className='container' >
                    <Carousel interval={1000} pauseOnHover={true}>
                         <Carousel.Item style={{ 'height':"300px" }}>
                                <img className="d-block w-100" src={Image1} alt=""/>
                            <Carousel.Caption>
                             <h3>Girls Edition</h3>
                            </Carousel.Caption>
                        </Carousel.Item  >
                        <Carousel.Item style={{ 'height':"300px" }}>
                                <img className="d-block w-100" src={Image2} alt=""/>
                            <Carousel.Caption>
                                <h3>Trends In 2020</h3>  
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item style={{ 'height':"300px" }}>  
                                <img className="d-block w-100" src={Image3} alt=""/>  
                            <Carousel.Caption>  
                                <h3>Black Edition</h3>  
                            </Carousel.Caption>  
                        </Carousel.Item>
                    
                        <Carousel.Item style={{ 'height':"300px" }}> 
                                <img className="d-block w-100" src={Image4} alt=""/>  
                            <Carousel.Caption>  
                                <h3>Popular In 2020</h3>
                            </Carousel.Caption>  
                        </Carousel.Item> 
                    </Carousel>
               </div>
            </div>
        )
    }
}

export default Carousell