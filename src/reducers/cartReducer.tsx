import { createSlice } from "@reduxjs/toolkit";

export type cartdata = {
  uniqueId:string
  ProductStock:number
  id:number
  image: string;
  title: string;
  stock: number;
  category: string;
  price: number;
  color:string
};


function localcartSection(){
  let LocalCartData:any=localStorage.getItem('cart-data')

  
  if (LocalCartData===null){
    return []
  }else{
    return JSON.parse(LocalCartData)
  }
}

type initialStateCartType={
  cartData:cartdata[] 
  TotalPrice:number
  TotalItems:number
}
const initialState:initialStateCartType = {
  cartData: localcartSection(),
  TotalPrice:0,
  TotalItems:0
};
export const CartReducers = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addData: (state, action) => {       
      state.cartData = [...state.cartData,action.payload];
    },
    setCartData:(state, action) => {       
      state.cartData = action.payload;
    },
    Total:(state,action)=>{
      state.TotalItems=action.payload.totalItems
      state.TotalPrice=action.payload.totalPrice
    }
  },
});

export const { addData,setCartData,Total } = CartReducers.actions;
