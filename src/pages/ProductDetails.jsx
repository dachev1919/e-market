import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/product-details.css";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import ProductList from "../components/UI/ProductList";
import { Col, Container, Row } from "reactstrap";
import { useDispatch } from "react-redux";
import { cartAction } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import useGetData from "../custom-hooks/useGetData";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [tab, setTab] = useState("description");
  const [rating, setRating] = useState(5);
  const reviewUser = useRef("");
  const reviewMsg = useRef("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data: products } = useGetData("products");
  const docRef = doc(db, "products", id);

  useEffect(() => {
    const getProduct = async () => {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProduct(docSnap.data());
      } else {
        toast.error("no product!");
      }

    };

    getProduct();

  }, [id]);

  const {
    productName,
    imageUrl,
    price,
    category,
    shortDescription,
    description
    // reviews,
    // avgRating
  } = product;

  const relatedProducts = products.filter((item) => item.category === category);

  const addToCartHandler = () => {
    dispatch(cartAction.addItem({
      id: product.id,
      productName: product.productName,
      imageUrl: product.imageUrl,
      price: product.price,
      quantity: product.quantity,
      totalPrice: product.totalPrice
    }));

    toast.success("Product added successfully");
  };

  const commentSubmitHandler = (e) => {
    e.preventDefault();

    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;

    reviewUser.current.value = reviewMsg.current.value = "";
    toast.success("Review submitted");

    console.log(
      {
        author: reviewUserName,
        message: reviewUserMsg,
        rating
      }
    );

    return {
      author: reviewUserName,
      message: reviewUserMsg,
      rating
    };
  };

  const starBackgroundHandler = (e) => {
    if (e.target.defaultValue) {
      const value = e.target.defaultValue;
      const allInputs = document.querySelectorAll(".review__rating input");

      allInputs.forEach((input) => input.className = "");

      allInputs.forEach((input) => {
        if (!(Number(input.defaultValue) === Number(value))) {
          input.checked = false;
        }

        if (Number(input.defaultValue) <= Number(value)) {
          input.className = "active";
        }
      });

    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Helmet title={productName}>
      <CommonSection title={productName} />

      <section className="product__details pt-0">
        <Container>
          <Row>
            <Col lg="6" className="product__image">
              <img src={imageUrl} alt="product" />
            </Col>
            <Col lg="6">
              <div className="product__information mt-5">
                <div className="product__rating d-flex align-items-center gap-2 mb-3">
                  <span className="d-flex"><i className="ri-star-s-fill" /></span>
                  {/*<p>{avgRating}</p>*/}
                  <p>5</p>
                </div>
                <h2 className="product__name mb-3">{productName}</h2>
              </div>
              <div>
                <span className="mb-3 d-flex">Category: {category}</span>
                <span className="product__price mb-3">${price}</span>
              </div>
              <p className="product__short-description">{shortDescription}</p>
              <button onClick={addToCartHandler} className="btn__primary btn__add-to-cart mt-5">Add To Cart</button>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="product__tab">
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab__wrapper d-flex align-items-center gap-5">
                <h6 className={`${tab === "description" ? "active__tab" : ""}`}
                    onClick={() => setTab("description")}>Description</h6>
                <h6 className={`${tab === "reviews" ? "active__tab" : ""}`}
                    onClick={() => setTab("reviews")}>Reviews</h6>
                {/*<h6 className={`${tab === "reviews" ? "active__tab" : ""}`} onClick={() => setTab("reviews")}>Reviews*/}
                {/*  ({reviews.length})</h6>*/}
              </div>


              <div className="tab__content">
                {
                  tab === "description"
                    ? (
                      <p>{description}</p>
                    )
                    : (
                      <div className="product__review">
                        <div className="review__wrapper">
                          <ul>
                            {/*{*/}
                            {/*  reviews.map((review, index) => (*/}
                            {/*    <li key={index}>*/}

                            {/*      <div className="product__rating d-flex align-items-center gap-2">*/}
                            {/*        <span className="d-flex"><i className="ri-star-s-fill" /></span>*/}
                            {/*        <p>{review.rating}</p>*/}
                            {/*      </div>*/}
                            {/*      <p className="review__author mt-2">{review.author}</p>*/}
                            {/*      <p className="mt-2">{review.text}</p>*/}
                            {/*    </li>*/}
                            {/*  ))*/}
                            {/*}*/}
                          </ul>
                          <div className="review__form">
                            <h4>Leave your experience</h4>
                            <form action="" onSubmit={commentSubmitHandler}>
                              <div className="form__group mb-3">
                                <input type="text" placeholder="Enter name" ref={reviewUser} required />
                              </div>
                              <div className="review__rating form__group mb-3" onClick={starBackgroundHandler}>
                                <label onClick={() => setRating(1)}>
                                  <input type="checkbox" className="active" value="1" />
                                  <i className="ri-star-s-line" />
                                  <i className="ri-star-s-fill" />
                                </label>
                                <label onClick={() => setRating(2)}>
                                  <input type="checkbox" className="active" value="2" />
                                  <i className="ri-star-s-line" />
                                  <i className="ri-star-s-fill" />
                                </label>
                                <label onClick={() => setRating(3)}>
                                  <input type="checkbox" className="active" value="3" />
                                  <i className="ri-star-s-line" />
                                  <i className="ri-star-s-fill" />
                                </label>
                                <label onClick={() => setRating(4)}>
                                  <input type="checkbox" className="active" value="4" />
                                  <i className="ri-star-s-line" />
                                  <i className="ri-star-s-fill" />
                                </label>
                                <label onClick={() => setRating(5)}>
                                  <input type="checkbox" className="active" value="5" />
                                  <i className="ri-star-s-line" />
                                  <i className="ri-star-s-fill" />
                                </label>
                              </div>

                              <div className="form__group mb-3">
                                                                <textarea
                                                                  required
                                                                  ref={reviewMsg}
                                                                  rows="4"
                                                                  placeholder="Review Message..."
                                                                />
                              </div>
                              <button type="submit" className="btn__primary btn__new-review text-center">Submit</button>
                            </form>
                          </div>
                        </div>
                      </div>
                    )
                }
              </div>
            </Col>

            <Col lg="12">
              <h2 className="related__products">You might also like</h2>
            </Col>

            <ProductList data={relatedProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;