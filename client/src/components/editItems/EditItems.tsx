import React, { useState, useEffect } from 'react';
import Item from '../Item/ItemToEdit';
import {
  makeStyles,
  Theme,
  createStyles,
  Button,
  Modal,
} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import AddIcon from '@material-ui/icons/Add';
import AddItemForm from './AddItemForm';
import { Formik } from 'formik';
import { AddItemSubmit } from './AddItemSubmit';
import * as Yup from 'yup';
import axios from '../../axios';
import { itemInterface } from '../Items/Item/Item';
import { useLocation } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabContainer: {
      marginBottom: '15px',
    },
    itemsContainer: {
      width: '65%',
      margin: 'auto',
      position: 'relative',
      marginTop: '35px',
    },
    titles: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '100%',
    },
    name: {
      flexBasis: '15%',
      textAlign: 'left',
    },
    priceInput: {
      flexBasis: '15%',
      textAlign: 'center',
      marginLeft: '10px',
      marginRight: '20px',
    },
    quantityInput: {
      flexBasis: '15%',
      textAlign: 'center',
      marginLeft: '10px',
    },
    items: {
      maxHeight: '700px',
      overflowY: 'scroll',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      '&::-webkit-scrollbar': {
        width: '0%',
        background: 'transparent',
      },
    },
    formButtons: {
      position: 'absolute',
      right: '0%',
      marginTop: '20px',
    },
    addButton: {
      marginRight: '30px',
    },
  })
);

const addItemFormValidationSchema = Yup.object({
  name: Yup.string().required('Debes ingresar un nombre'),
  price: Yup.number().required('Debes ingresar un precio'),
  quantity: Yup.number().required('Debes ingresar una cantidad'),
  tags: Yup.string().required('Debes ingresar una etiqueta'),
  category: Yup.string().required('Debes ingresar una categoria'),
  partitionable: Yup.boolean(),
  fullWeightPrice: Yup.string(),
});

export interface addItemFormValues {
  name: string;
  price: string;
  quantity: string;
  tags: string;
  category: string;
  partitionable: boolean;
  fullWeightPrice: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const EditItems = () => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  let location = useLocation();

  const [items, setItems] = useState<itemInterface[]>([]);

  const [modifiedItems, setModifiedItems] = useState<itemInterface[]>([]);

  const [tabValue, setTabValue] = useState(0);

  const categories = [
    'quesos',
    'fiambres',
    'pizzas',
    'item 1',
    'item 2',
    'item 3',
  ];

  const [category, setCategory] = useState('quesos');

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    const cat = categories[newValue];
    setCategory(cat);
    setTabValue(newValue);
  };

  useEffect(() => {
    (async function getItemsByCategory() {
      const items = await axios.get<itemInterface[]>('/items/' + category);
      setItems(items.data);
      setModifiedItems(items.data);
    })();
  }, [category]);

  const modifyPrice = (index: number, newPrice: number) => {
    modifiedItems[index].price = newPrice;
    setModifiedItems(modifiedItems);
  };

  const modifyQuantity = (index: number, newQuantity: number) => {
    modifiedItems[index].quantity = newQuantity;
    setModifiedItems(modifiedItems);
  };

  const modifyFullWeightPrice = (index: number, newPrice: number) => {
    modifiedItems[index].fullWeightPrice = newPrice.toString();
    setModifiedItems(modifiedItems);
  };

  const sendModifiedItems = async () => {
    const modifiedItemsResponse = await axios.post(
      '/items/editItems',
      modifiedItems
    );

    if (modifiedItemsResponse.status === 201) {
      const items = await axios.get<itemInterface[]>('/items/' + 'quesos');
      setItems(items.data);
      setModifiedItems(items.data);
    }
  };

  const initialAddItemFormValues: addItemFormValues = {
    name: '',
    price: '',
    quantity: '',
    tags: '',
    category: '',
    partitionable: false,
    fullWeightPrice: '',
  };

  const [imageUrl, setImgUrl] = useState('');

  const cleanUpSubmit = () => {
    setOpenModal(false);
    setImgUrl('');
  };

  return (
    <React.Fragment>
      <div className={classes.itemsContainer}>
        <AppBar
          position="static"
          color="default"
          elevation={0}
          className={classes.tabContainer}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            //variant="scrollable"
            centered
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            {categories.map((category, index) => {
              return (
                <Tab
                  label={category[0].toUpperCase() + category.slice(1)}
                  {...a11yProps(index)}
                />
              );
            })}
          </Tabs>
        </AppBar>
        <div className={classes.titles}>
          <div className={classes.name}>Nombre</div>
          <div>Precio/Kg</div>
          <div className={classes.priceInput}>Nuevo Precio</div>
          <div>Cantidad</div>
          <div className={classes.quantityInput}>Nueva cantidad</div>
          <div>Precio orma</div>
          <div className={classes.priceInput}>Nuevo precio orma</div>
        </div>
        <div className={classes.items}>
          {items.map((item, index) => {
            return (
              <Item
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                fullWeightPrice={item.fullWeightPrice}
                id={item.id}
                index={index}
                key={item.id}
                modifyItemPrice={modifyPrice}
                modifyItemQuantity={modifyQuantity}
                modifyFullWeightPrice={modifyFullWeightPrice}
              />
            );
          })}
        </div>
        <div className={classes.formButtons}>
          <Button
            color="primary"
            variant="contained"
            className={classes.addButton}
            onClick={handleOpen}
          >
            <AddIcon />
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={sendModifiedItems}
          >
            <DoneIcon />
          </Button>
        </div>
      </div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Formik
          initialValues={initialAddItemFormValues}
          validationSchema={addItemFormValidationSchema}
          onSubmit={(values, actions) => {
            AddItemSubmit(values, actions, imageUrl);
            cleanUpSubmit();
          }}
          render={(props) => <AddItemForm {...props} setImageUrl={setImgUrl} />}
        />
      </Modal>
    </React.Fragment>
  );
};

export default EditItems;
