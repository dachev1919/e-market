import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/signup.css";
// firebase
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const storageRef = ref(storage, `image/${Date.now() + username}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on((error) => {
        toast.error(error.message);
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then(async (downloadUrl) => {
            // update user profile
            await updateProfile(user, {
              displayName: username,
              photoURL: downloadUrl
            });

            // store user data in firestore database
            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              displayName: username,
              email,
              photoURL: downloadUrl
            });
          });
      });

      setLoading(false);
      toast.success("Account created");
      navigate("/e-market/login");
    } catch (error) {
      toast.error("something went wrong");
      setLoading(false);
    }
  };

  return (
    <Helmet title="Signup">
      <section className="signup">
        <Container>
          <Row>
            {
              loading
                ? (
                  <Col lg="12" className="text-center">
                    <h5 className="fw-bold loading__message">Loading.....</h5>
                  </Col>
                )
                : (
                  <Col lg="6" className="m-auto text-center">
                    <h3 className="fw-bold fs-4 mb-4">Signup</h3>
                    <Form className="signup__form" onSubmit={signup}>
                      <FormGroup className="form__group">
                        <input
                          type="text"
                          placeholder="Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </FormGroup>
                      <FormGroup className="form__group">
                        <input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </FormGroup>
                      <FormGroup className="form__group mb-4">
                        <input
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </FormGroup>
                      <FormGroup className="form__group__image mb-4 text-start">
                        <input
                          type="file"
                          onChange={(e) => setFile(e.target.files[0])}
                        />
                      </FormGroup>
                      <button type="submit" className="btn__primary auth__btn white">Create an Account</button>
                      <p className="mt-4">Already have an account? <Link to="/e-market/login">Login</Link></p>
                    </Form>
                  </Col>
                )
            }
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Signup;