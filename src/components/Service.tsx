import { Box } from "@mui/system";
import React from "react";
import "./componant.css";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineSecurity } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";

export default function Service() {
  return (
    <div className="container my-5">
      <div className="row p-5">
        <div className="col-lg-12">
          <div className="row d-flex align-items-center">
            <div className="col-lg-4 bg-light rounded bg-primary">
              <div className="row">
                <div className="col-12 p-3">
                  <TbTruckDelivery className="display-5 m-auto d-flex" />
                </div>
              </div>
              <div className="row">
                <div className="col-12 p-3">
                  <span className="d-flex justify-content-center">
                    Super Fast and free Delivery
                  </span>
                </div>
              </div>
            </div>

            <div className="col-lg-4  bg-light">
              <div className="row">
                <div className="col-12 p-5 d-flex align-items-center justify-content-center">
                  <span className="display-5 "><MdOutlineSecurity/></span>Non Contact Shopping
                </div>
              </div>
              <div className="row">
                <div className="col-12 p-5 d-flex align-items-center justify-content-center">
                  <span className="display-5 "><GiReceiveMoney/></span>Money Back Guaranteed
                </div>
              </div>
            </div>


            <div className="col-lg-4 bg-light rounded">
              <div className="row">
                <div className="col-12 p-3">
                  <TbTruckDelivery className="display-5 m-auto d-flex" />
                </div>
              </div>
              <div className="row">
                <div className="col-12 p-3">
                  <span className="d-flex justify-content-center">
                    Super Fast and free Delivery
                  </span>
                </div>
              </div>
            </div>

        

          </div>
        </div>
      </div>
    </div>
  );
}
