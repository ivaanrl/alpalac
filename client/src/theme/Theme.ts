import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import yellow from "@material-ui/core/colors/yellow";

const Theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff0000"
    },
    secondary: {
      main: "#ffffff"
    },
    warning: yellow,
    error: purple
  }
});

export default Theme;
