import { createTheme } from '@material-ui/core';
import { lightBlue } from '@material-ui/core/colors';

export const Theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: lightBlue[300],
    },
  },
});
