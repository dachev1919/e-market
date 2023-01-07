import React from "react";
import { Container, Row } from "reactstrap";
import useAuth from "../custom-hooks/useAuth";
import "../styles/admin-nav.css";
import { NavLink } from "react-router-dom";

const ADMIN_NAV = [
  {
    display: "Dashboard",
    path: "/e-market/dashboard"
  },
  {
    display: "All-Products",
    path: "/e-market/dashboard/all-products"
  },
  {
    display: "Orders",
    path: "/e-market/dashboard/orders"
  },
  {
    display: "Users",
    path: "/e-market/dashboard/users"
  }
];

const AdminNav = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <header className="admin__header">
        <div className="admin__nav-top">
          <Container>
            <Row>
              <div className="admin__nav-wrapper-top d-flex align-items-center justify-content-between gap-5">
                <div className="logo">
                  <NavLink to="/e-market">
                    <h1>E-market</h1>
                  </NavLink>
                </div>
                <div className="search__box d-flex align-items-center justify-content-between">
                  <input type="text" placeholder="Search..." />
                  <span><i className="ri-search-line" /></span>
                </div>
                <div className="admin__nav-top-right d-flex align-items-center gap-4">
                  <span><i className="ri-notification-3-line" /></span>
                  <span><i className="ri-settings-2-line" /></span>
                  <img src={currentUser && currentUser.photoURL} alt="user-img" />
                </div>

              </div>
            </Row>
          </Container>
        </div>
      </header>
      <section className="admin__menu p-0">
        <Container>
          <Row>
            <div className="admin__navigation">
              <ul className="admin__menu-list d-flex align-items-center justify-content-center gap-5 m-0">
                {
                  ADMIN_NAV.map((item, index) => (

                    <li key={index} className="admin__menu-item">

                      <NavLink to={item.path}
                               className={({ isActive }) => isActive ? "active__admin-menu" : ""}
                               end
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  ))
                }
              </ul>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AdminNav;