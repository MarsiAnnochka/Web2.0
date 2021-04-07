import * as React from 'react';
import Carousel from 'react-bootstrap/Carousel'
import {Navbar} from "../components/Navbar/Navbar";

export const Home: React.FC = () => (
    <React.Fragment>
        <Navbar/>
        <div className="container-fluid p-0">
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/public/1.png"
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/public/2.jpg"
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/public/3.jpg"
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
        </div>
    </React.Fragment>
)