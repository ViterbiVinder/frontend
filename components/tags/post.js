// Cite: https://codesandbox.io/s/c3x43?file=/demo.js

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from "@material-ui/core/Container";

const useStyles = makeStyles({
    root: {
        width: '100%',
        color: 'white',

    },

    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    },

});

export default function Post() {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
        <Card className={classes.root}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" color="inherit">
                        Post Title
                    </Typography>
                    <Typography variant="body2"  component="p" color="inherit">
                        Post content
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="inherit">
                    Comment
                </Button>
            </CardActions>
        </Card>
        </Container>
    );
}
