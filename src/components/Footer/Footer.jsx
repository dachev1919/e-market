import React from 'react';
import './footer.css';
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link, NavLink } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col lg='3' className='mb-4'>
                        <NavLink to='/e-market' className="logo">
                            <div>
                                <h1 className='text-white'>E-market</h1>
                            </div>
                        </NavLink>
                        <p className="footer__text mt-4">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
                            aliquam commodi culpa, et fugiat itaque numquam perferendis
                            perspiciatis porro quo!
                        </p>
                    </Col>

                    <Col lg='3' className='mb-4'>
                        <div className="footer__quick-links">
                            <h4 className="quick__links-title">Top Categories</h4>
                            <ListGroup>
                                <ListGroupItem className='ps-0 border-0'>
                                    <Link to='/e-market'>Mobile Phones</Link>
                                </ListGroupItem>
                                <ListGroupItem className='ps-0 border-0'>
                                    <Link to='/e-market'>Modern Sofa</Link>
                                </ListGroupItem>
                                <ListGroupItem className='ps-0 border-0'>
                                    <Link to='/e-market'>Arm Chair</Link>
                                </ListGroupItem>
                                <ListGroupItem className='ps-0 border-0'>
                                    <Link to='/e-market'>Smart Watches</Link>
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    </Col>

                    <Col lg='3' className='mb-4'>
                        <div className="footer__quick-links">
                            <h4 className="quick__links-title">Top Categories</h4>
                            <ListGroup>
                                <ListGroupItem className='ps-0 border-0'>
                                    <Link to='/e-market'>Mobile Phones</Link>
                                </ListGroupItem>
                                <ListGroupItem className='ps-0 border-0'>
                                    <Link to='/e-market'>Modern Sofa</Link>
                                </ListGroupItem>
                                <ListGroupItem className='ps-0 border-0'>
                                    <Link to='/e-market'>Arm Chair</Link>
                                </ListGroupItem>
                                <ListGroupItem className='ps-0 border-0'>
                                    <Link to='/e-market'>Smart Watches</Link>
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    </Col>

                    <Col lg='3' className='mb-4'>
                        <div className="footer__quick-links footer__contact">
                            <h4 className="quick__links-title">Contact</h4>
                            <ListGroup>
                                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                                    <span><i className="ri-map-pin-line"/></span>
                                    <p>123 Kyiv, Ukraine</p>
                                </ListGroupItem>
                                <ListGroupItem className='ps-0 border-0'>
                                    <a className='d-flex align-items-center gap-3' href="tel:38063636321">
                                        <span><i className="ri-phone-line"/></span>
                                        <p>+38063636321</p>
                                    </a>
                                </ListGroupItem>
                                <ListGroupItem className='ps-0 border-0'>
                                    <a className='d-flex align-items-center gap-3' href="mailto:example123@gmail.com">
                                        <span><i className="ri-mail-line"/></span>
                                        <p>example123@gmail.com</p>
                                    </a>
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    </Col>

                    <Col lg='12'>
                        <p className="footer__copyright">Copyright {currentYear} developed by Dachev. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;