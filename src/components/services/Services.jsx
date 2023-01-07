import React from 'react';
import './services.css';
import { Container, Row, Col } from "reactstrap";
import { motion } from "framer-motion";

import serviceData from "../../assets/data/serviceData";

const Services = () => {
    return (
        <section className="services">
            <Container>
                <Row>
                    {
                        serviceData.map((service, index) => (
                            <Col lg='3' md='6' key={index}>
                                <motion.div
                                    whileHover={{scale: 1.05}}
                                    className="services__item"
                                    style={{background: service.bg}}
                                >
                                    <span><i className={service.icon}/></span>
                                    <div>
                                        <h3>{service.title}</h3>
                                        <p>{service.subtitle}</p>
                                    </div>
                                </motion.div>
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        </section>
    );
};

export default Services;