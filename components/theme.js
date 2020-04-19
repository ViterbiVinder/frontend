import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    typography: {
      color: "#FFCC00",
    },
    primary: {
      main: '#990000',
    },
    secondary: {
      main: '#FFCC00',
    },
    error: {
      main: red.A400,
    },
    background: {
      paper: '#990000',
      default: '#CCCCCC',
    },
  }
});

export default theme;
