import React, { useEffect, useState } from "react";
import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import '../styles/shop.css';
import ProductList from "../components/UI/ProductList";
import useGetData from "../custom-hooks/useGetData";

const Shop = () => {
    const { data: products, loading } = useGetData("products");
    const [productsData, setProductsData] = useState([]);

    useEffect(() => {
        setProductsData(products);
    }, [products]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const categoryFilterHandler = (e) => {
        const filterValue = e.target.value;
        const filteredProducts = products.filter(item => item.category === filterValue);

        if (filteredProducts.length > 1) setProductsData(filteredProducts);
    };

    const priceFilterHandler = (e) => {
        const productsArrayCopy = [...products];
        const filterValue = e.target.value;
        const filteredProducts =
            filterValue === 'ascending'
                ? productsArrayCopy.sort((a, b) => Number(a.price) - Number(b.price))
                : productsArrayCopy.sort((a, b) => Number(b.price) - Number(a.price));

        if (filteredProducts.length > 1) setProductsData(filteredProducts);
    };

    const searchHandler = (e) => {
        const searchTerm = e.target.value;
        const searchedProducts = products.filter((item) => item.productName.toLowerCase().includes(searchTerm.toLowerCase()));

        setProductsData(searchedProducts);
    };

    return (
        <Helmet title='Shop'>
            <CommonSection title='Products'/>

            <section>
                <Container>
                    <Row>
                        <Col lg='3' md='6'>
                            <div className="filter__widget">
                                <select onChange={categoryFilterHandler}>
                                    <option>Filter By Category</option>
                                    <option value="sofa">Sofa</option>
                                    <option value="mobile">Mobile</option>
                                    <option value="chair">Chair</option>
                                    <option value="watch">Watch</option>
                                    <option value="wireless">Wireless</option>
                                </select>
                            </div>
                        </Col>
                        <Col lg='3' md='6'>
                            <div className="filter__widget">
                                <select onChange={priceFilterHandler}>
                                    <option>Sort By</option>
                                    <option value="ascending">Ascending</option>
                                    <option value="descending">Descending</option>
                                </select>
                            </div>
                        </Col>
                        <Col lg='6' md='12'>
                            <div className="search__box d-flex justify-content-center align-items-center">
                                <input onChange={searchHandler} type="text" placeholder='Search...' />
                                <span className='d-flex'><i className="ri-search-line"/></span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section>
                <Container>
                    <Row>
                        {
                            loading
                              ? <h5>Loading...</h5>
                              : (
                                productsData.length === 0 ? <h1 className='text-center fs-3'>No products are found!</h1> : <ProductList data={productsData}/>
                              )
                        }
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default Shop;