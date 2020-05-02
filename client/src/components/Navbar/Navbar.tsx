import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import allActions from '../../actions';
import { StoreState } from '../../reducers';
import clsx from 'clsx';
import {
  fade,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ReorderIcon from '@material-ui/icons/Reorder';
import useWindowDimensions from '../../shared/useWindowsDimensions';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import KitchenIcon from '@material-ui/icons/Kitchen';
import AddIcon from '@material-ui/icons/Add';

import Modal from '@material-ui/core/Modal';
import FormControl from '@material-ui/core/FormControl';
import GoogleButton from 'react-google-button';
//import FacebookLogin from "react-facebook-login";

import axios from '../../axios';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import ShoppingCartPopper from './shoppingCartPopper/ShoppingCartPopper';
import { useLocation } from 'react-router-dom';
import { withRouter } from 'react-router';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      maxWidth: '100vw',
    },
    logoNavbar: {
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: 0,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      width: '100%',
      flex: 1,
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
      [theme.breakpoints.up('md')]: {
        marginLeft: '15px',
      },
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '80%',
        marginLeft: '15px',
      },
    },
    logo: {
      width: '100%',
      marginLeft: '15px',
      textAlign: 'left',
      fontSize: '20px',
      fontWeight: 'bold',
    },
    rightNavbar: {
      position: 'absolute',
      right: 0,
      marginRight: '40px',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      flex: 1,
      width: '60%',
      justifyContent: 'flex-end',
      [theme.breakpoints.down('md')]: {
        width: '80%',
      },
    },
    account: {},
    shoppingCartNavBar: {
      marginRight: '15px',
    },
    categories: {
      textAlign: 'left',
      marginLeft: '15px',
      fontWeight: 'bolder',
      fontSize: '20px',
    },
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    loginFormContainer: {
      width: '50%',
      maxWidth: '450px',
      margin: 'auto',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translateX(-50%) translateY(-50%)',

      borderRadius: '10px',
    },
    authForm: {
      backgroundColor: 'white',
      width: '100%',
      height: '500px',
      borderRadius: '10px',
    },
    signInContainer: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    signInTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: 'black',
    },
    switchAuth: {
      color: 'grey',
      fontSize: '16px',
    },
    switchAuthLink: {
      color: 'grey',
      fontWeight: 'bold',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    navLink: {
      display: 'flex',
      flexDirection: 'row',
      color: 'black',
      textDecoration: 'none',
    },
    aElement: {
      textDecoration: 'none',
      color: 'inherit',
    },
    myOrders: {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
      marginRight: '10px',
    },
    logoutButton: {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    accountButtonsList: {
      display: 'none',
      [theme.breakpoints.down('sm')]: {
        display: 'block',
      },
    },
    accountButtons: {
      display: 'none',
      [theme.breakpoints.down('sm')]: {
        textAlign: 'left',
        marginLeft: '15px',
        fontWeight: 'bolder',
        fontSize: '20px',
        display: 'block',
      },
    },
    logoutDrawer: {
      display: 'none',
      [theme.breakpoints.down('sm')]: {
        display: 'inherit',
      },
    },
    myOrdersDrawer: {
      display: 'none',
      [theme.breakpoints.down('sm')]: {
        display: 'inherit',
      },
    },
    loginDrawer: {
      display: 'none',
      [theme.breakpoints.down('sm')]: {
        display: 'inherit',
      },
    },
    signinDrawer: {
      display: 'none',
      cursor: 'pointer',
      fontWeight: 'bold',
      backgroundColor: `${theme.palette.primary.main}`,
      borderRadius: '5px',
      marginRight: '10px',
      marginLeft: '10px',
      color: `${theme.palette.secondary.main}`,
      [theme.breakpoints.down('sm')]: {
        display: 'inherit',
      },
    },
  })
);

const Navbar = (props: RouteComponentProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { history } = props;

  const [
    popperAnchorEl,
    setPopperAnchorEl,
  ] = React.useState<null | HTMLElement>(null);

  const handleShoppingCartIconClick = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    if (user.role !== '') {
      setPopperAnchorEl(popperAnchorEl ? null : event.currentTarget);
    } else {
      handleOpen();
    }
  };

  const openPopper = Boolean(popperAnchorEl);

  const dispatch = useDispatch();
  let user = useSelector((state: StoreState) => state.user);
  let { shoppingCart } = useSelector((state: StoreState) => state.shoppingCart);
  let shoppingCartCount = shoppingCart.length;

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width > 1670) {
      setOpen(true);
    }
  }, [width]);

  useEffect(() => {
    const getUser = async () => {
      const user = await axios.get<{
        id: string;
        firstName: string;
        lastName: string;
        role: string;
        address: string;
        phoneNumber: string;
      }>('api/current_user');
      dispatch(allActions.login(user.data));
    };
    getUser();
  }, [dispatch]);

  let location = useLocation().pathname.split('/')[1];

  let authButtons = (
    <Button
      variant="outlined"
      color="secondary"
      disableElevation
      onClick={handleOpen}
    >
      Iniciar Sesión
    </Button>
  );

  if (user.firstName !== '' && user.lastName !== '') {
    authButtons = (
      <React.Fragment>
        <NavLink to="/myOrders" className={classes.aElement}>
          <Button
            variant="contained"
            color="secondary"
            disableElevation
            className={classes.myOrders}
          >
            Mis pedidos
          </Button>
        </NavLink>
        <a href="/api/logout" className={classes.aElement}>
          <Button
            variant="outlined"
            color="secondary"
            disableElevation
            className={classes.logoutButton}
          >
            Cerrar Sesión
          </Button>
        </a>
      </React.Fragment>
    );
  }

  const userNavigation: string[] = [
    'Quesos',
    'Picadas',
    'Fiambres',
    'Golosinas',
    'Varios',
  ];
  const adminNavigation: string[] = [
    'Agregar/Editar',
    'Pedidos pendientes',
    'Todos los pedidos',
  ];

  const authForm = (
    <FormControl className={classes.authForm}>
      <div className={classes.signInContainer}>
        <div className={classes.signInTitle}>Iniciar Sesión</div>
        <a href="/auth/google" className={classes.aElement}>
          <GoogleButton label="Iniciar sesión con Google" />
        </a>
        <GoogleButton label="Iniciar sesión con Google" />
      </div>
    </FormControl>
  );

  const chooseNavItem = (text: string) => {
    switch (text) {
      case 'Carrito':
        return (
          <NavLink to="/shoppingCart" className={classes.navLink}>
            <ListItem button key={text}>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </NavLink>
        );
      case 'Agregar/Editar':
        return (
          <NavLink to="/editItems" className={classes.navLink}>
            <ListItem button key={text}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </NavLink>
        );
      case 'Pedidos pendientes':
        return (
          <NavLink to="/orders" className={classes.navLink}>
            <ListItem button key={text}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </NavLink>
        );
      default:
        return (
          <React.Fragment>
            <NavLink to="/category/quesos" className={classes.navLink}>
              <ListItem button key={text}>
                <ListItemIcon>
                  <KitchenIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </NavLink>
          </React.Fragment>
        );
    }
  };

  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (
    e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  const search = () => {
    history.push({
      pathname: '/search/item',
      search: '?' + new URLSearchParams({ searchValue }).toString(),
    });
  };

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    e.persist();
    setSearchValue(e.target.value);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          {open ? null : (
            <Typography variant="h6" noWrap className={classes.logoNavbar}>
              Alpalac
            </Typography>
          )}
          <div className={classes.rightNavbar}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon onClick={search} />
              </div>
              <InputBase
                placeholder="Buscar…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                value={searchValue}
                onKeyUp={handleSearch}
                onChange={handleSearchChange}
              />
            </div>
            <div className={classes.account}>
              <ShoppingCartPopper
                open={openPopper}
                anchorEl={popperAnchorEl}
                handleShoppingCartIconClick={handleShoppingCartIconClick}
              />
              {location === 'checkout' ? null : (
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  className={classes.shoppingCartNavBar}
                  onClick={handleShoppingCartIconClick}
                >
                  <Badge
                    badgeContent={shoppingCartCount}
                    color="error"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  >
                    <ShoppingCartIcon color="secondary" />
                  </Badge>
                </Button>
              )}

              {authButtons}
              <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                <div className={classes.loginFormContainer}>{authForm}</div>
              </Modal>
            </div>
          </div>
        </Toolbar>
      </AppBar>

      {width > 1670 ? (
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <div className={classes.logo}>Alpalac</div>
            <IconButton onClick={handleDrawerClose}>
              <MenuIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <div className={classes.categories}>Categorías</div>

            {userNavigation.map((text, index) => chooseNavItem(text))}
          </List>
          <Divider />
          <List>
            {['Carrito'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          {user.role === 'admin' ? (
            <React.Fragment>
              <Divider />
              <List>
                {adminNavigation.map((text, index) => chooseNavItem(text))}
              </List>
            </React.Fragment>
          ) : null}
        </Drawer>
      ) : (
        <Modal
          open={open}
          onClose={handleDrawerClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          hideBackdrop={width > 1670}
          disableBackdropClick={width > 1670}
        >
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <div className={classes.logo}>Alpalac</div>
              <IconButton onClick={handleDrawerClose}>
                <MenuIcon />
              </IconButton>
            </div>
            <Divider />
            <List className={classes.accountButtonsList}>
              {user.role !== '' ? (
                <React.Fragment>
                  <div className={classes.accountButtons}>Mi cuenta</div>
                  <NavLink
                    to="/myOrders"
                    className={classes.navLink + ' ' + classes.myOrdersDrawer}
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <ReorderIcon />
                      </ListItemIcon>
                      <ListItemText primary="Mis pedidos" />
                    </ListItem>
                  </NavLink>
                  <a
                    href="/api/logout"
                    className={classes.navLink + ' ' + classes.logoutDrawer}
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <ExitToAppIcon />
                      </ListItemIcon>
                      <ListItemText primary="Cerrar Sesión" />
                    </ListItem>
                  </a>
                </React.Fragment>
              ) : (
                <div
                  onClick={handleOpen}
                  className={classes.navLink + ' ' + classes.signinDrawer}
                >
                  <ListItem button>
                    <ListItemIcon>
                      <AccountCircleIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="Iniciar sesión" />
                  </ListItem>
                </div>
              )}
              <Divider />
            </List>
            <List>
              <div className={classes.categories}>Categorías</div>

              {userNavigation.map((text, index) => chooseNavItem(text))}
            </List>
            {user.role === 'admin' ? (
              <React.Fragment>
                <Divider />
                <List>
                  {adminNavigation.map((text, index) => chooseNavItem(text))}
                </List>
              </React.Fragment>
            ) : null}
          </Drawer>
        </Modal>
      )}
    </div>
  );
};
export default withRouter(Navbar);
