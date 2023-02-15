import React, { useEffect } from "react";
import { useAppDispatch, useAppSelecter } from "./featur";
import { BsCurrencyDollar } from "react-icons/bs";
import { Counter } from "./SingleProduct";
import { setCartData ,Total} from "./reducers/cartReducer";
import { Button } from "@mui/material";
import { RiDeleteBinLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
export default function Cart() {
  const dispatch = useAppDispatch();
  const { cartData,TotalItems,TotalPrice } = useAppSelecter((state) => {
    return state.cart;
  });

  const getTotalPrice=()=>{
    let totalPrice=0
    let totalItems=0
    cartData.map(val=>{
      totalPrice+=val.price*val.stock
      totalItems+=val.stock
    })
    dispatch(Total({totalItems,totalPrice}))
    
  }
  useEffect(() => {
    localStorage.setItem("cart-data", JSON.stringify(cartData));
    getTotalPrice()
  }, [cartData]);

  const addItems = (id: number) => {
    const data = cartData.map((val) => {
      if (val.ProductStock > val.stock) {
        if (val.id === id) {
          return {
            ...val,
            stock: val.stock + 1,
          };
        } else {
          return val;
        }
      } else {
        return val;
      }
    });
    dispatch(setCartData(data));
  };
  const MinusItems = (id: number) => {
    const data = cartData.map((val) => {
      if (val.stock > 1) {
        if (val.id === id) {
          return {
            ...val,
            stock: val.stock - 1,
          };
        } else {
          return val;
        }
      } else {
        return val;
      }
    });
    dispatch(setCartData(data));
  };

  const removeSelectedProduct = (id: string) => {
    const data = cartData.filter((val) => {
      return val.uniqueId === id ? null : val;
    });
    dispatch(setCartData(data));
  };
  return (
    <div className="container my-5">
      {/* -----------------------------cart section--------------------------------------------- */}
      {cartData.map((val, ind) => {
        const additem = val.stock;
        const ProductId = val.id;

        return (
          <div
            className="row my-5 d-flex align-items-center border border-primary"
            key={ind}
          >
            <div className="col-lg-4 col-md-4 d-flex align-items-center justify-content-center">
              <img src={val?.image} alt="" className="image-single" />
            </div>

            <div className="col-lg-8 col-md-8">
              <h2 style={{ fontSize: "20px", color: "blue" }} className="m-2">
                {val?.title}
              </h2>

              <h3 style={{ fontSize: "20px" }} className="m-2">
                <span style={{ color: "red" }}>category</span> :-{" "}
                {val?.category}
              </h3>

              <div className="m-2 d-flex align-items-center">
                <span style={{ fontWeight: "700", color: "red" }}>Price</span>{" "}
                :- {val.price*val.stock}
                <BsCurrencyDollar />
              </div>

              <div className="m-0">
                <Counter data={{ ProductId, additem, addItems, MinusItems }} />
              </div>

              <div className="m-2 d-flex align-items-center">
                <span style={{ fontWeight: "700", color: "red" }}>Color</span>{" "}
                :-
                <div
                  style={{
                    backgroundColor: val.color,
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                  }}
                ></div>
              </div>

              <div className="cart-section-actions m-2 d-flex align-items-center">
                

                <RiDeleteBinLine className="text-danger  display-6" onClick={()=>removeSelectedProduct(String(ProductId)+val.color)}/>
              </div>
            </div>
          </div>
        );
      })}
      {/* -------------------------------------------------------------------------------- */}

      <hr/>
      <div className="d-flex align-items-center justify-content-between">
        <NavLink to="/product"><Button variant="contained">Continue Shopping</Button></NavLink>
        <Button variant="contained" className="bg-danger m-2" onClick={()=>dispatch(setCartData([]))}>Clear Cart</Button>
      </div>

      <div className="row">
        <div className="col-lg-12 d-flex justify-content-end m-2">
          <div className="bg-light border border-2">
            <span className="m-5">Subtotal:-{"   "}{TotalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
