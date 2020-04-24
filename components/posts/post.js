// Cite: [1] https://codesandbox.io/s/c3x43?file=/demo.js
// [2] https://codesandbox.io/s/8vqhk?file=/demo.js:816-892

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from "@material-ui/core/CardHeader";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from "@material-ui/core/Container";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import grey from '@material-ui/core/colors/grey';
import vinderTheme from "../theme";


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    border: "1px solid black",
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: grey[200]
  },
  header: {
    backgroundColor: grey[300]
  },
  tags: {
    marginLeft: "auto",
  },
  avatar: {
    backgroundColor: vinderTheme.palette.primary.main
  }
}));

export default function Post() {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
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
        </Container>
    );
}
