import React, { useState, useEffect } from "react";
import Item from "../Item/ItemToEdit";
import {
  makeStyles,
  Theme,
  createStyles,
  Button,
  Modal,
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import AddIcon from "@material-ui/icons/Add";
import AddItemForm from "./AddItemForm";
import { Formik } from "formik";
import { AddItemSubmit } from "./AddItemSubmit";
import * as Yup from "yup";
import axios from "../../axios";
import { itemInterface } from "../Items/Item/Item";
import { RouteComponentProps, withRouter } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemsContainer: {
      width: "65%",
      margin: "auto",
      position: "relative",
    },
    titles: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      width: "100%",
    },
    name: {
      flexBasis: "25%",
    },
    priceInput: {
      width: "20%",
    },
    quantityInput: {
      width: "13%",
    },
    items: {
      maxHeight: "700px",
      overflowY: "scroll",
    },
    formButtons: {
      position: "absolute",
      right: "0%",
      marginTop: "20px",
    },
    addButton: {
      marginRight: "30px",
    },
  })
);

const addItemFormValidationSchema = Yup.object({
  name: Yup.string().required("Debes ingresar un nombre"),
  price: Yup.number().required("Debes ingresar un precio"),
  quantity: Yup.number().required("Debes ingresar una cantidad"),
  tags: Yup.string().required("Debes ingresar una etiqueta"),
  category: Yup.string().required("Debes ingresar una categoria"),
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

const EditItems = (props: RouteComponentProps) => {
  const classes = useStyles();

  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const { location } = props;

  const [items, setItems] = useState<itemInterface[]>([]);

  const [modifiedItems, setModifiedItems] = useState<itemInterface[]>([]);

  useEffect(() => {
    const category = location.pathname.split("/")[2];
    (async function getItemsByCategory() {
      const items = await axios.get<itemInterface[]>("/items/" + "quesos");
      setItems(items.data);
      setModifiedItems(items.data);
    })();
  }, [location]);

  const modifyPrice = (index: number, newPrice: number) => {
    modifiedItems[index].price = newPrice;
    setModifiedItems(modifiedItems);
  };

  const modifyQuantity = (index: number, newQuantity: number) => {
    modifiedItems[index].quantity = newQuantity;
    setModifiedItems(modifiedItems);
  };

  const sendModifiedItems = async () => {
    const modifiedItemsResponse = await axios.post(
      "/items/editItems",
      modifiedItems
    );

    if (modifiedItemsResponse.status === 201) {
      const items = await axios.get<itemInterface[]>("/items/" + "quesos");
      console.log(items.data);
      setItems(items.data);
      setModifiedItems(items.data);
    }
  };

  const initialAddItemFormValues: addItemFormValues = {
    name: "",
    price: "",
    quantity: "",
    tags: "",
    category: "",
    partitionable: false,
    fullWeightPrice: "",
  };

  const [imageUrl, setImgUrl] = useState("");

  const cleanUpSubmit = () => {
    setOpenModal(false);
    setImgUrl("");
  };

  return (
    <React.Fragment>
      <div className={classes.itemsContainer}>
        <div className={classes.titles}>
          <div className={classes.name}>Nombre</div>
          <div>Precio</div>
          <div className={classes.priceInput}>Nuevo Precio</div>
          <div>Cantidad</div>
          <div className={classes.quantityInput}>
            Nueva<br></br> cantidad
          </div>
        </div>
        <div className={classes.items}>
          {items.map((item, index) => {
            return (
              <Item
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                id={item.id}
                index={index}
                key={item.id}
                modifyItemPrice={modifyPrice}
                modifyItemQuantity={modifyQuantity}
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

export default withRouter(EditItems);
