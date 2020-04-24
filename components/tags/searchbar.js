// cite: https://material-ui.com/components/app-bar/

import React from 'react';

import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import vinderTheme from "../theme"

import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },


    search: {

        position: 'relative',
        borderRadius: theme.shape.borderRadius,


        marginLeft: 0,



        width: '100%',

        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(0),
            marginBottom: theme.spacing(2),
            background: vinderTheme.palette.background.paper,

            width: '100%',
        },
    },
    searchIcon: {
        color: "#FFCC00",
        background: '#990000',
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'white',

        width: '100%',
    },
    inputInput: {
        // padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',

    },
}));

export default function SearchBar() {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">


                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>


        </Container>
    );
}