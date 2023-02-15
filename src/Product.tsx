import "./components/componant.css";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelecter } from "./featur";
import { GrClose } from "react-icons/gr";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import { viewtypes } from "./components/SelectedProduct";
import { Button, Rating } from "@mui/material";
import { NavLink } from "react-router-dom";
import { getapi } from "./reducers/HomeReducer";
import { UseReducers } from "./reducers/HomeReducer";
import { TiTick } from "react-icons/ti";
import { SelectedProducts } from "./components/SelectedProduct";

export default function Product() {
  //resource

  const dispatch = useAppDispatch();
  let [view, setview] = useState<string>("Grid");
  let [ColorClick, setColorClick] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getapi());
  }, []);

  const { all_products, all_api, isLoading } = useAppSelecter(
    (state) => state.home
  );

  //All unique Category
  let newAllCategory = new Set(all_api?.map((val) => val.category));

  //All unique color
  let newAllColor = new Set(
    all_api?.map((val) => val.colors.map((v2) => v2)).flat()
  );
  // All Titles
  let AllTitle = new Set(all_api?.map((val) => val.title));


  //-------------------   define all function -----------------------------------------------------
  const changeDataThroughInput = (e: any) => {
    //using api debounce
    setTimeout(() => {
      const newdata = all_api?.filter((val) =>
        val.title
          .toLocaleLowerCase()
          .includes(e.target.value.toLocaleLowerCase())
          ? val
          : null
      );
      dispatch(UseReducers(newdata));
    }, 250);
  };

  const showFilterSection = () => {
    let ele: any = document.getElementById("filter");
    ele.setAttribute("style", "display:block;");
  };
  const hideFilterSection = () => {
    let ele: any = document.getElementById("filter");
    ele.setAttribute("style", "display:none");
  };

  //for category filter section
  const setCategoryData = (Categorytxt: any) => {
    const newCategoryProductData = all_api?.filter((val) =>
      val.category === Categorytxt.textContent ? val : null
    );
    dispatch(UseReducers(newCategoryProductData));
  };

  //for color filter section
  const setColorData = (selectedcolor: string) => {
    const newColoredProductData = all_api?.filter((val) =>
      val.colors.includes(selectedcolor) ? val : null
    );
    dispatch(UseReducers(newColoredProductData));
    setColorClick(selectedcolor);
  };

  //for title filter section
  const setTitledData = (e: any) => {
    const newTitledProductData = all_api.filter((val) =>
      val.title === e.target.value ? val : null
    );
    dispatch(UseReducers(newTitledProductData));
  };

  // clear all filters
  const ClearAllFilters = () => {
    dispatch(UseReducers(all_api));
  };

  return isLoading === true ? (
    <h1>Loading...</h1>
  ) : (
    <div className="conatiner">
      <div className="row m-5">
        {/*-------------------------------------------------- Grid and List view section */}
        <div className="view-filter col-ld-4 col-md-4 col-sm-12 d-flex justify-content-around align-items-center ">
          <div>
            Grid{" "}
            <BsFillGrid3X3GapFill
              className="display-6"
              onClick={() => setview("Grid")}
            />
          </div>
          <div>
            List{" "}
            <FaList className="display-6" onClick={() => setview("List")} />
          </div>
        </div>
        {/* ----------------------------------------------------------------------------------- */}
        {/* -------------------------------------Search Section filter--------------------------------- */}
        <div className="input-filter col-lg-6 col-md-4 col-sm-12">
          <div>
            <input
              type="text"
              onChange={changeDataThroughInput}
              placeholder="search title..."
              style={{ width: "100%", padding: "5px" }}
            />
          </div>
        </div>
        {/* --------------------------------------------------------------------------------------------- */}
        {/* ---------------------------------------------filter button------------------------------------------- */}
        <div className="main-filter col-lg-2 col-md-4 col-sm-12 mb-2 d-flex justify-content-end">
          <Button
            variant="contained"
            onClick={showFilterSection}
            className="main-button"
          >
            Filter
          </Button>
        </div>
        {/* ---------------------------------------------------------------------------------------------------- */}
      </div>

      <div id="filter">
        <GrClose className="filter-close" onClick={hideFilterSection} />

        <h3 className="d-flex justify-content-center text-primary">Filters</h3>
        {/* ---------------------------------------------------------------catergory filter section */}
        <div>
          CateGory:-
          <br />
          {Array.from(newAllCategory)?.map((val) => (
            <div key={val}>
              <button
                className="btn btn-primary"
                style={{ margin: "10px 20px", width: "200px" }}
                onClick={(e) => setCategoryData(e.target)}
              >
                {val}
              </button>
            </div>
          ))}
        </div>
        {/* ------------------------------------------------------------------------------------------------ */}
        {/* -------------------------------------------color section filter------------------------------------ */}
        <div className="conatiner">
          Color:-
          <div className="row m-auto">
            {Array.from(newAllColor).map((val) => (
              <div
                className="col-lg-4 m-2 d-flex align-items-center text-center text-white"
                key={val}
                style={{
                  backgroundColor: val,
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%"
                }}
                onClick={() => setColorData(val)}
              >
                {val === ColorClick ? <TiTick /> : null}
              </div>
            ))}
          </div>
        </div>
        {/* ----------------------------------------------------------------------------------------------------- */}
        {/* -----------------------------------------------------------------------------Price Range section */}
        <div className="my-2 d-flex align-items-center">
          Tilte :-
          <select style={{ width: "150px" }} onChange={setTitledData}>
            {Array.from(AllTitle).map((val) => (
              <option key={val}>{val}</option>
            ))}
          </select>
        </div>
        {/* -------------------------------------------------------------------------------------------- */}
        <div className="mx-4 my-5">
          <Button variant="contained" onClick={ClearAllFilters}>
            Clear All Filters
          </Button>
        </div>
      </div>

      <div>
        {view === "Grid" ? (
          <SelectedProducts data={all_products} />
        ) : (
          <Listview data={all_products} />
        )}
      </div>
    </div>
  );
}

const Listview = (props: viewtypes) => {
  
  return (
    <div className="container my-5">
      <div className="row g-2 m-auto">
        {props.data?.map((val) => {
          return (
            <div
              key={val.id}
              className="col-lg-5 col-md-12 col-sm-12 mx-2 d-flex align-items-center justify-content-around"
              style={{ border: "2px solid black" }}
            >
              <div className="col-lg-5 col-md-4 col-sm-4">
                <img src={val.image} alt="" className="list-image" />
              </div>
              <div className="col-lg-5 col-md-8 col-sm-8">
                <div className="list-text my-2">{val.title}</div>
               <br/>
                <Rating value={val.rating.rate} className="my-1"></Rating>
                <br/>
                <NavLink to={`/singleproduct/${val.id}`}>
                  <Button variant="contained" className="list-button my-2">
                    View
                  </Button>
                </NavLink>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

