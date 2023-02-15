import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { getDatabase, ref, set, get } from "firebase/database";
import { app } from "../firebase";

export default function Signup() {
  const navigate = useNavigate();
  let [action, setaction] = useState<string>("signup");

  const db = getDatabase(app);

  let [data, setData] = useState({
    name: "",
    Phone: "",
    email: "",
    password: "",
  });

  const putDataTodatabase = () => {
    if (
      data.name == "" ||
      data.Phone == "" ||
      data.email == "" ||
      data.password == ""
    ) {
      alert("please, feild Properly");
      return;
    }
    set(ref(db, `Ecom/${data.name}`), {
      PhoneNo: data.Phone,
      Email: data.email,
      PassWord: data.password,
    })
      .then((res) => {
        alert("Data is Submitted");
        navigate("/");
      })
      .catch((err) => console.log(err.message));
  };

  const cheakEmailAndPassword = async () => {
    type valuesType={
      Email:string,
      PassWord:string,
      PhoneNo:string
    }
    // if (data.email === "" || data.password === "") {
    //   alert("please, feild Properly");
    //   return;
    // }
    const retrive: any = await get(ref(db, "Ecom"));
    const res: any = await retrive.val();
    const values:valuesType[]=await Object.values(res)

    let found:string="fail"
    values.map(val=>{
      if (val.Email===data.email && val.PassWord===data.password){
        found="success"
      }
    })
    
    if(found==="success"){
      navigate("/")
    }else{
      alert("Wrong Email and Password !!")
    }
  };

  useEffect(() => {
    setData({ name: "", Phone: "", email: "", password: "" });
  }, [action]);
  return (
    <div className="container my-5">
      <div className="row ">
        <div className="col-lg-12 col-md-12 col-sm-12 d-flex align-items-center justify-content-center">
          <div className="bg-light p-2" style={{ width: "100%" }}>
            <div>
              <span className="my-2 d-flex align-items-center">
                <Button
                  variant="outlined"
                  className=" m-2"
                  onClick={() => setaction("signup")}
                >
                  SignUp
                </Button>
                <Button variant="outlined" onClick={() => setaction("login")}>
                  Login
                </Button>
              </span>
              {action === "signup" ? (
                <div>
                  <div className="my-2">
                    <TextField
                      type="text"
                      id="outlined-multiline-flexible"
                      label="Name"
                      multiline
                      sx={{ width: "100%" }}
                      onChange={(e: any) =>
                        setData({ ...data, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="my-2">
                    <TextField
                      type="number"
                      id="outlined-multiline-flexible"
                      label="PhoneNo"
                      multiline
                      sx={{ width: "100%" }}
                      onChange={(e: any) =>
                        setData({ ...data, Phone: e.target.value })
                      }
                    />
                  </div>
                  <div className="my-2">
                    <TextField
                      type="email"
                      id="outlined-multiline-flexible"
                      label="Email"
                      sx={{ width: "100%" }}
                      onChange={(e: any) =>
                        setData({ ...data, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="my-2">
                    <TextField
                      type="password"
                      id="outlined-password-input"
                      label="Password"
                      sx={{ width: "100%" }}
                      onChange={(e: any) =>
                        setData({ ...data, password: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Button variant="outlined" onClick={putDataTodatabase}>
                      SignUp
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="my-2">
                    <TextField
                      type="email"
                      label="email"
                      sx={{ width: "100%" }}
                      onChange={(e: any) =>
                        setData({ ...data, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="my-2">
                    <TextField
                      type="password"
                      label="password"
                      sx={{ width: "100%" }}
                      onChange={(e: any) =>
                        setData({ ...data, password: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Button variant="outlined" onClick={cheakEmailAndPassword}>
                      Login
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
