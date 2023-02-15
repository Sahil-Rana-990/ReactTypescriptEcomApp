import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelecter } from "./featur";
import "./components/componant.css";
import { TiTick } from "react-icons/ti";
import { BsCurrencyDollar } from "react-icons/bs";
import { Rating } from "@mui/material";
import { SelectedProducts } from "./components/SelectedProduct";
import { getapi } from "./reducers/HomeReducer";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { setCartData,addData } from "./reducers/cartReducer";

export default function SingleProduct() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  let [additem, setadditem] = useState(1);

  const { all_api } = useAppSelecter((state) => {
    return state.home;
  });
  const { cartData } = useAppSelecter((state) => state.cart);

  useEffect(() => {
    dispatch(getapi());
  }, []);

  const singleProduct = all_api?.filter((val) =>
    val.id === Number(id) ? val : null
  );

  let data = singleProduct?.[0];
  const ProductId = data.id;
  let [color, setcolor] = useState(data?.colors[0]);

  let RelatedData = all_api?.filter((val) =>
    val.category === data?.category ? val : null
  );

  const addItems = (id: number) => {
    data.stock <= additem ? setadditem(data.stock) : setadditem(additem + 1);
  };
  const MinusItems = (id: number) => {
    additem <= 1 ? setadditem(1) : setadditem(additem - 1);
  };

  const addToCart = () => {
    let cartdata = {
      uniqueId: String(data.id) + color,
      ProductStock: data.stock,
      id: data.id,
      image: data.image,
      title: data.title,
      category: data.category,
      stock: additem,
      price: data.price,
      color,
    };
    const existData = cartData.find(
      (val) => val.uniqueId === String(data.id) + color
    );
    if (existData) {
      let twiceSelectedStock = existData.stock + additem;
      if (twiceSelectedStock >= data.stock) {
        twiceSelectedStock = data.stock;
      }
      
      let newData=cartData.map(val=>{
        if(val.uniqueId===String(data.id) + color){
          return{
            ...val,
            
            stock:twiceSelectedStock
          }
        }else{
          return val
        }
      })

      dispatch(setCartData(newData))
      
      
      return;
    }

    dispatch(addData(cartdata));
  };

  return data === undefined ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      <div className="container my-5 single-product">
        <div className="row g-0 d-flex align-items-center">
          <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
            <img src={data?.image} alt="" className="image-single" />
          </div>

          <div className="col-lg-6 col-md-6">
            <h2 style={{ fontSize: "20px", color: "blue" }} className="m-2">
              {data?.title}
            </h2>
            <h4 className="m-2">
              <span style={{ color: "red" }}>Rate</span> :-{" "}
              <Rating value={data?.rating.rate} readOnly></Rating>
            </h4>
            <h3 style={{ fontSize: "20px" }} className="m-2">
              <span style={{ color: "red" }}>category</span> :- {data?.category}
            </h3>
            <h5 className="m-2">
              <span style={{ color: "red" }}>description</span> :-{" "}
              <span style={{ fontSize: "12px", fontFamily: "fira code" }}>
                {data?.description}
              </span>
            </h5>
            <h5 className="m-2">
              <span style={{ color: "red" }}>Price</span>:- {data?.price}
              <BsCurrencyDollar />
            </h5>
            <div className="d-flex align-items-center m-2">
              <span style={{ color: "red", fontWeight: "600" }}>Color</span>
              {data?.colors.map((val) => (
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: val,
                    borderRadius: "50%",
                    margin: "10px",
                    textAlign: "center",
                    color: "white",
                  }}
                  key={val}
                  onClick={() => setcolor(val)}
                >
                  {val === color ? <TiTick /> : null}
                </div>
              ))}
            </div>
            <Counter data={{ ProductId, additem, addItems, MinusItems }} />
            <NavLink to="/cart" className="m-2">
              <Button onClick={() => addToCart()}>Add To Cart</Button>
            </NavLink>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-center" style={{ textDecoration: "underline" }}>
          Related Product
        </h1>
        <SelectedProducts data={RelatedData} />
      </div>
    </div>
  );
}

type CounterType = {
  data: {
    ProductId: number;
    additem: any;
    addItems: (id: number) => void;
    MinusItems: (id: number) => void;
  };
};

export const Counter = ({ data }: CounterType) => {
  return (
    <div className="m-2 d-flex align-items-center">
      <span style={{ color: "red", fontWeight: "600", fontSize: "20px" }}>
        Quantity
      </span>
      :-
      <div className="mx-2">
        <span
          onClick={() => data.MinusItems(data.ProductId)}
          className="display-6"
          style={{ cursor: "pointer", margin: "0px 10px" }}
        >
          -
        </span>
        <span className="display-6">{data.additem}</span>

        <span
          onClick={() => data.addItems(data.ProductId)}
          className="display-6"
          style={{ cursor: "pointer", margin: "0px 10px" }}
        >
          +
        </span>
      </div>
    </div>
  );
};
