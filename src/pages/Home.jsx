import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import Services from "../components/services/Services";
import ProductList from "../components/UI/ProductList";
import Clock from "../components/UI/Clock";
import "../styles/home.css";
import heroImg from "../assets/images/hero-img.png";
import counterImg from "../assets/images/c-timer.png";
import useGetData from "../custom-hooks/useGetData";

function filterProduct(products, key) {
  return products.filter((item) => item.category === key);
}

const Home = () => {
  const { data: products, loading } = useGetData("products");
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [newArrivalsProducts, setNewArrivalsProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const filteredTrendingProducts = filterProduct(products, "chair");
    const filteredBestSalesProducts = filterProduct(products, "sofa");
    const filteredNewArrivalsProducts = products.filter((item) => ["mobile", "wireless"].includes(item.category));
    const filteredPopularProducts = filterProduct(products, "watch");

    setTrendingProducts(filteredTrendingProducts);
    setBestSalesProducts(filteredBestSalesProducts);
    setNewArrivalsProducts(filteredNewArrivalsProducts);
    setPopularProducts(filteredPopularProducts);
  }, [products]);

  return (
    <Helmet title={"Home"}>
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
                <p className="hero__subtitle">Trending product in {currentYear}</p>
                <h2>Make Your Interior More Minimalistic & Modern</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Accusantium, assumenda autem ex explicabo harum magnam minus
                  officia quis similique!
                </p>
                <Link to="/e-market/shop">
                  <button className="btn__primary shop__btn">Shop now</button>
                </Link>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={heroImg} alt="hero" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Services />

      <section className="trending__products">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title mb-5">Trending Products</h2>
            </Col>
            {
              loading ? <h5 className="fw-bold">Loading...</h5> : <ProductList data={trendingProducts} />
            }
          </Row>
        </Container>
      </section>

      <section className="best__sales">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title mb-5">Best Sales</h2>
            </Col>
            {
              loading ? <h5 className="fw-bold">Loading...</h5> : <ProductList data={bestSalesProducts} />
            }
          </Row>
        </Container>
      </section>

      <section className="timer__count">
        <Container>
          <Row>
            <Col md="6">
              <div className="clock__top-content">
                <h4 className="text-white fs-6 mb-2">Limited Offers</h4>
                <h3 className="text-white fs-5 mb-3">Quality Armchair</h3>
              </div>
              <Clock />
              <button className="btn__primary white"><Link to="/e-market/shop">Shop Now</Link></button>
            </Col>

            <Col md="6" className="text-end counter__image">
              <img src={counterImg} alt="counter" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="new__arrivals">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title mb-5">New Arrivals</h2>
            </Col>
            {
              loading ? <h5 className="fw-bold">Loading...</h5> : <ProductList data={newArrivalsProducts} />
            }
          </Row>
        </Container>
      </section>

      <section className="popular__category">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title mb-5">Popular Category</h2>
            </Col>
            {
              loading ? <h5 className="fw-bold">Loading...</h5> : <ProductList data={popularProducts} />
            }
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;