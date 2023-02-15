import { ApiType } from "../reducers/HomeReducer";
import { NavLink } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import { cartdata } from "../reducers/cartReducer";

export type viewtypes = {
  data: ApiType[] | null ;
};

export const SelectedProducts = (props: viewtypes) => {
  return (
    <div className="container my-5">
      <div className="row m-auto d-flex">
        {props.data?.map((val) => {
          return (
            <div className="col-lg-3 col-md-6 col-sm-6 g-3" key={val.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height={200}
                  image={val.image}
                  style={{ objectFit: "contain" }}
                />

                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {val.category}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Veniam laboriosam explicabo repellat enim, sint natus!
                    Possimus harum minus doloremque quisquam.
                  </Typography>
                </CardContent>
                <CardActions>
                  <NavLink to={`/singleproduct/${val.id}`}>
                    <Button variant="contained">View</Button>
                  </NavLink>
                </CardActions>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};
