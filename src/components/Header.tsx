import React from "react";
import "./componant.css";
export default function Header() {
  return (
    <div className="container">
      <div className="row m-5">
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <div className="right-part">
            <img
              className="img-fluid"
              src="https://thumbs.dreamstime.com/b/family-shopping-coronavirus-pandemic-black-child-wearing-face-masks-purchasing-food-supermarket-african-american-206686205.jpg"
              alt=""
            />
           
          </div>
        </div>

        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <div className="left-part">
            <h1 className="welcome">Welcome To React Ecom Shop</h1>
            <p className="welcome-text">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat
              fuga, eaque illo impedit sequi quod voluptas culpa sunt voluptates
              vero, esse soluta, tempora quis eligendi cumque totam fugit sit
              possimus.
            </p>
            <button>Explore Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

<div className="main-header">
  <div className="left-part">
    <h1 className="welcome">Welcome To React Ecom Shop</h1>
    <p className="welcome-text">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat fuga,
      eaque illo impedit sequi quod voluptas culpa sunt voluptates vero, esse
      soluta, tempora quis eligendi cumque totam fugit sit possimus.
    </p>
    <button>Explore Now</button>
  </div>
  <div className="right-part">
    <img
      src="https://thumbs.dreamstime.com/b/family-shopping-coronavirus-pandemic-black-child-wearing-face-masks-purchasing-food-supermarket-african-american-206686205.jpg"
      alt=""
    />
    <div className="back"></div>
  </div>
</div>;
