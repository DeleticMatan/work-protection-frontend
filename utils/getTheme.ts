import { createMuiTheme } from "@material-ui/core/styles";
import { deepOrange, yellow } from "@material-ui/core/colors";

const theme: any = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      light: deepOrange[500],
      main: deepOrange[700],
      dark: deepOrange[900],
    },
    secondary: {
      light: yellow[500],
      main: yellow[700],
      dark: yellow[900],
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: '"Montserrat"',
  },
  overrides: {
    MuiTable: {
      root: {},
    },
    MuiTableBody: {
      root: {},
    },
    MuiTableRow: {
      root: {
        boxSizing: "unset",
      },
    },
    MuiTableCell: {
      root: {},
    },
  },
});

export default theme;
