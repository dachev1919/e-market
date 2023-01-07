import React from "react";
import { Col, Container, Row } from "reactstrap";
import useGetData from "../custom-hooks/useGetData";
import "../styles/users.css";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

const Users = () => {
  const { data: usersData, loading } = useGetData("users");

  const userDeleteHandler = async (id) => {
    await deleteDoc(doc(db, 'users', id));
    toast.success('user deleted');
  }

  return (
    <section className="users admin__section">
      <Container>
        <Row>
          <Col lg="12">
            <h4 className="fw-bold">Users</h4>
          </Col>
          <Col lg="12">
            <table className="table">
              <thead>
              <tr>
                <th>Image</th>
                <th>Username</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
              </thead>
              <tbody>
              {
                loading ? (
                  <tr>
                    <td>Please</td>
                    <td>wait</td>
                    <td>for</td>
                    <td>loading...</td>
                  </tr>
                ) : (
                  usersData?.map((user) => (
                    <tr key={user.id}>
                      <td><img src={user.photoURL} alt={user.id + Date.now()} /></td>
                      <td>{user.displayName}</td>
                      <td>{user.email}</td>
                      <td>
                        {/*<button className="btn__primary delete" onClick={() => userDeleteHandler(user.id)}>delete</button>*/}
                        <button className="btn__primary delete">delete</button>
                      </td>
                    </tr>
                  ))
                )
              }
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Users;