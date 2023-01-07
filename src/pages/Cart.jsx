import React from "react";
import "../styles/cart.css";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Col, Container, Row } from "reactstrap";
import { cartAction } from "../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Tr = ({product}) => {
  const dispatch = useDispatch();

  const deleteProductHandler = () => dispatch(cartAction.deleteItem(product.id));
  console.log(product);
  return (
    <tr>
      <td><img src={product.imageUrl} alt={`product-${product.id}`} /></td>
      <td>{product.productName}</td>
      <td className='text-center'>${product.price}</td>
      <td className='text-center'>{product.quantity}</td>
      <td className="trash text-center" onClick={deleteProductHandler}><i className="ri-delete-bin-line" /></td>
    </tr>
  )
};
const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  return (
    <Helmet title="Cart">
      <CommonSection title="Shopping Cart" />
      <section className="cart">
        <Container>
          <Row>

            {cartItems.length === 0
              ? <h2 className="fs-4 text-center">No item added to the cart</h2>
              : (
                <>
                  <Col lg="9">
                    <table className="table bordered">
                      <thead>
                      <tr>
                        <td>Image</td>
                        <td>Title</td>
                        <td className='text-center'>Price</td>
                        <td className='text-center'>Quantity</td>
                        <td className='text-center'>Delete</td>
                      </tr>
                      </thead>

                      <tbody>
                      {
                        cartItems.map((product) => (
                          <Tr key={product.id} product={product} />
                        ))
                      }
                      </tbody>
                    </table>
                  </Col>
                  <Col lg="3">
                    <div>
                      <h6 className='d-flex align-items-center justify-content-between mb-3'>Subtotal<span className='fs-4 fw-bold'>${totalAmount}</span></h6>

                    </div>
                    <p className=' mb-5'>taxes and shipping will calculate in checkout</p>
                    <div>
                      <Link to='/e-market/shop'><button className="btn__primary w-100 mb-2">Continue Shopping</button></Link>
                      <Link to='/e-market/checkout'><button className="btn__primary w-100">Checkout</button></Link>
                    </div>
                  </Col>
                </>
              )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Cart;