import React, { useState } from "react";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import "../styles/add-product.css";
import { toast } from "react-toastify";
import { db, storage } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const [enterTitle, setEnterTitle] = useState("");
  const [enterShortDescription, setEnterShortDescription] = useState("");
  const [enterDescription, setEnterDescription] = useState("");
  const [enterCategory, setEnterCategory] = useState("");
  const [enterPrice, setEnterPrice] = useState(0);
  const [enterProductImage, setEnterProductImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Add product to the firebase database
    try {
      const docRef = await collection(db, "products");
      const storageRef = ref(storage, `productImages/${Date.now() + enterProductImage.name}`);
      const uploadTask = uploadBytesResumable(storageRef, enterProductImage);

      uploadTask.on(() => {
        toast.error("images not uploaded");
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await addDoc(docRef, {
            productName: enterTitle,
            shortDescription: enterShortDescription,
            description: enterDescription,
            category: enterCategory,
            price: enterPrice,
            imageUrl: downloadURL
          });
        });
      });
      toast.success("product successfully added");
      navigate("/e-market/dashboard/all-products");
    } catch (error) {
      toast.error("product not added");
    }
    setLoading(false);
  };

  return (
    <section className="add__product admin__section">
      <Container>
        <Row>
          <Col lg="12">
            {
              loading
                ? <h4 className="pt-5">Loading...</h4>
                : (
                  <>
                    <h4 className="text-center">Add Product</h4>
                    <Form className="mt-3" onSubmit={addProduct}>
                      <FormGroup className="form__group">
                        <span>Product title</span>
                        <input value={enterTitle} onChange={(e) => setEnterTitle(e.target.value)} type="text"
                               placeholder="Double sofa" required />
                      </FormGroup>
                      <FormGroup className="form__group">
                        <span>Short description</span>
                        <textarea value={enterShortDescription} onChange={(e) => setEnterShortDescription(e.target.value)}
                                  rows="3" placeholder="Lorem...." required />
                      </FormGroup>
                      <FormGroup className="form__group">
                        <span>Description</span>
                        <textarea value={enterDescription} onChange={(e) => setEnterDescription(e.target.value)} rows="3"
                                  placeholder="Description...." required />
                      </FormGroup>
                      <div className="d-flex align-items-center gap-3">
                        <FormGroup className="form__group w-50">
                          <span>Price</span>
                          <input min={0} value={enterPrice} onChange={(e) => setEnterPrice(Number(e.target.value))}
                                 type="number" placeholder="$100" required />
                        </FormGroup>
                        <FormGroup className="form__group w-50">
                          <span>Category</span>
                          <select onChange={(e) => setEnterCategory(e.target.value)} name="" id="">
                            <option value="chair">Chair</option>
                            <option value="sofa">Sofa</option>
                            <option value="mobile">Mobile</option>
                            <option value="watch">Watch</option>
                            <option value="wireless">Wireless</option>
                          </select>
                        </FormGroup>
                      </div>
                      <div>
                        <FormGroup className="form__group">
                          <span>Product Image</span>
                          <input onChange={(e) => setEnterProductImage(e.target.files[0])} type="file" required />
                        </FormGroup>
                      </div>

                      <button type="submit" className="btn__primary">Add Product</button>
                    </Form>
                  </>
                )
            }
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProducts;