import React from "react";
import { Col, Container, Row } from "reactstrap";
import "../styles/all-product.css";
import { db } from "../firebase.config";
import { doc, deleteDoc } from "firebase/firestore";
import useGetData from "../custom-hooks/useGetData";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const AllProducts = () => {
  const { data: productsData, loading } = useGetData("products");

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    toast.success("deleted");
  };

  return (
    <section className="all__products admin__section">
      <Container>
        <Row>
          <Col lg="12">
            <table className="table all__products-list">
              <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
              </thead>
              <tbody>
              {
                loading
                  ? (
                    <tr className="all__products-item">
                      <td className="">Please</td>
                      <td>waiting</td>
                      <td>for</td>
                      <td>loading...</td>
                      <td />
                    </tr>
                  )
                  : (
                    productsData.map((item) => (
                      <tr key={item.id} className="all__products-item">
                        <td className=""><img src={item.imageUrl} alt="prod" /></td>
                        <td>{item.productName}</td>
                        <td>{item.category}</td>
                        <td>${item.price}</td>
                        <td>
                          {/*<button className="btn__primary delete" onClick={() => deleteProduct(item.id)}>Delete</button>*/}
                          <button className="btn__primary delete">Delete</button>
                        </td>
                      </tr>
                    ))
                  )
              }
              </tbody>
            </table>
          </Col>
          <Col className='d-flex justify-content-center'><NavLink to={'/e-market/dashboard/add-product'}><button className='btn__primary'>Add new product</button></NavLink></Col>
        </Row>
      </Container>
    </section>
  );
};

export default AllProducts;