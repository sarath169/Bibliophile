import React from "react";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import "./BookCard.css"

function BookCard(props) {
  console.log(props);
  const history = useHistory();
  // const navigate = useNavigate();
  const handleDetailsView = () => {
    history.push("/details");
  };
  return (
    <div className="container">
      <Card>
        <CardActionArea>
            <div className="media">
          <CardMedia
            component="img"
            image={props.book.image_link_small}
            alt="green iguana"
          />
          </div>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.book.title}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={handleDetailsView}
          >
            Details
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default BookCard;
