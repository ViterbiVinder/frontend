import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Button from "@material-ui/core/Button";
import grey from '@material-ui/core/colors/grey';
import vinderTheme from "../theme";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    border: "1px solid black",
    marginBottom: 40,
    backgroundColor: grey[200]
  },
  header: {
    backgroundColor: grey[300]
  },
  heart: {
    color: red[900]
  },
  tags: {
    marginLeft: "auto",
  },
  avatar: {
    backgroundColor: red[900]
  }
}));

export default function PostCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader className={classes.header} 
        avatar={<Avatar aria-label="user" className={classes.avatar} />}
        title="Full Name"
        subheader="Timestamp Posted"
      />
      <CardContent>
        <Typography component="p">
          This is filler text for a post that a user has made.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <CardContent className={classes.tags}>
          <Button>#CSCI104</Button>
          <Button>#CSCI201</Button>
        </CardContent>
      </CardActions>
    </Card>
  );
}
