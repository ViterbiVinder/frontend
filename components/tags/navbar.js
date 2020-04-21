
// Cite: https://material-ui.com/components/bottom-navigation/

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Container from "@material-ui/core/Container";
import vinderTheme from "../theme"
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles({

    root: {
        width: '100%',
        backgroundColor: vinderTheme.palette.secondary.main,
        marginBottom: 20,
    },



});

export default function SimpleNavigation() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    return (
        <Container component="main" maxWidth="xs">
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction label="Top" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Latest" icon={<RestoreIcon  />} />
            <BottomNavigationAction label="People" icon={<PersonIcon />} />
        </BottomNavigation>
        </Container>
    );
}
