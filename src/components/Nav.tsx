import React from "react";
import "./componant.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useAppSelecter } from "../featur";

export default function Nav() {
  const { TotalItems } = useAppSelecter((state) => state.cart);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="logo">
          <span>React</span> Ecom
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse mx-5"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <div className="nav-link active">
                <NavLink to="/signup" className="text-decoration-none rounded p-1">
                  Login
                </NavLink>
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link active">
                <NavLink to="/" className="text-decoration-none">
                   Home
                </NavLink>
              </div>
            </li>
            <li className="nav-item dropdown">
              <div className="nav-link active" id="navbarDropdown">
                <NavLink to="/Product" className="text-decoration-none">
                  Products
                </NavLink>
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link active position-relative">
                <NavLink to="/cart" className="text-decoration-none">
                  <AiOutlineShoppingCart style={{ fontSize: "20px" }} />
                  <span
                    style={{
                      position: "absolute",
                      top: "0px",
                      backgroundColor: "red",
                      color: "white",
                      padding: "1px",
                      width: "20px",
                      height: "20px",
                      fontSize: "12px",
                      borderRadius: "50%",
                      textAlign: "center",
                    }}
                  >
                    {TotalItems}
                  </span>
                </NavLink>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

<div className="main">
  <nav>
    <div className="logo">
      <span>React</span> Ecom
    </div>
    <div className="product-list">
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Product</li>
        <li>Contact</li>
        <li>
          <AiOutlineShoppingCart />
        </li>
      </ul>
    </div>
  </nav>
</div>;
