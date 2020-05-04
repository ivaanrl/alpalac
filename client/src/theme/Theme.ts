import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import yellow from '@material-ui/core/colors/yellow';

const Theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff0000',
    },
    secondary: {
      main: '#ffffff',
    },
    info: {
      main: '#1e2a78',
    },
    warning: yellow,
    error: blue,
  },
});

export default Theme;
