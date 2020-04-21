// Cite: [1] https://codesandbox.io/s/c3x43?file=/demo.js
// [2] https://codesandbox.io/s/8vqhk?file=/demo.js:816-892

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from "@material-ui/core/Container";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import vinderTheme from "../theme";


const useStyles = makeStyles({
    root: {
        width: '100%',
        color: 'white',

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
                    <Typography variant="body1"  component="p" color="inherit">
                        Post content
                    </Typography>

                    <Typography variant="body2"  component="p" color="inherit">
                        <Chip avatar={<Avatar>U</Avatar>} label="User" />
                    </Typography>
                </CardContent>
            </CardActionArea>

        </Card>
        </Container>
    );
}
