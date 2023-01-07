import React, { useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./header.css";
import { Container, Row } from "reactstrap";
import { motion } from "framer-motion";
import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";
import { useSelector } from "react-redux";
import useAuth from "../../custom-hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";


const nav__links = [
  {
    path: "/e-market",
    display: "Home"
  },
  {
    path: "/e-market/shop",
    display: "Shop"
  },
  {
    path: "/e-market/cart",
    display: "Cart"
  }
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const profileActionRef = useRef(null);

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  const logout = () => {
    signOut(auth).then(() => {
      toast.success("Logged out");
      navigate("/e-market");
    }).catch((err) => {
      toast.error(err.message);
    });
  };

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  useEffect(() => {
    stickyHeaderFunc();

    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  }, []);

  const navigateToCart = () => {
    navigate("/e-market/cart");
  };

  const toggleProfileActions = () => profileActionRef.current.classList.toggle("show__profileActions");


  return (
    <header ref={headerRef} className="header">
      <Container>
        <Row>
          <div className="nav__wrapper">
            <NavLink to="/e-market" className="logo">
              <img src={logo} alt="logo" />
              <div>
                <h1>E-market</h1>
              </div>
            </NavLink>
            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav__links.map((link, index) => (
                  <li
                    key={index}
                    className="nav__item"
                  >
                    <NavLink
                      to={link.path}
                      className={({ isActive }) => isActive ? "nav__active" : ""}
                      end
                    >
                      {link.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="nav__icons">
              <span className="fav__icon">
                  <i className="ri-heart-line" />
                  <span className="badge">1</span>
              </span>
              <span className="cart__icon" onClick={navigateToCart}>
                <i className="ri-shopping-bag-line" />
                <span className="badge">{totalQuantity}</span>
              </span>
              <span className="profile">
                  <motion.img
                    whileTap={{ scale: 1.2 }}
                    src={currentUser ? currentUser.photoURL : userIcon}
                    alt="user-icon"
                    onClick={toggleProfileActions}
                  />
                <span className="profile__actions" ref={profileActionRef} onClick={toggleProfileActions}>
                  {
                    currentUser
                      ? (
                        <div className="d-flex flex-column justify-content-center align-items-center">
                          <span onClick={logout}>Logout</span>
                          <Link to="/e-market/dashboard">Dashboard</Link>
                        </div>
                      )
                      : (
                        <div className="d-flex flex-column justify-content-center align-items-center">
                          <Link to="/e-market/signup">Signup</Link>
                          <Link to="/e-market/login">Login</Link>
                        </div>
                      )
                  }
                </span>
              </span>
              <div className="mobile__menu" onClick={menuToggle}>
                <span className="d-flex"><i className="ri-menu-line" /></span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;