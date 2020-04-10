import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import { Place } from "../../../reducers/interfaces";
import EditIcon from "@material-ui/icons/Edit";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function EditPlace(props: any) {
  const classes = useStyles();

  const { close, place } = props;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={place.media}
          title={place.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {`${place.name} - ${place.day}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {`Description: ${place.description}`}
            <IconButton>
              <EditIcon color="primary" fontSize="small" />
            </IconButton>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {place.day}
            <IconButton>
              <EditIcon color="primary" fontSize="small" />
            </IconButton>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {`Website: ${place.web}`}
            <IconButton>
              <EditIcon color="primary" fontSize="small" />
            </IconButton>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {`Place type: ${place.sleeping ? "Sleeping" : "Visiting"}`}
            <IconButton>
              <EditIcon color="primary" fontSize="small" />
            </IconButton>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={close}>
          OK
        </Button>
        <Button size="small" color="primary" onClick={close}>
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}
