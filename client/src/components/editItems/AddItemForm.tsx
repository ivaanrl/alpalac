import React, {
  ChangeEvent,
  useState,
  SyntheticEvent,
  Dispatch,
  SetStateAction,
} from "react";
import {
  TextField,
  makeStyles,
  Theme,
  createStyles,
  Button,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import request from "superagent";
import cloudinaryConfig from "../../config/cloudinaryConfig";
import ImageIcon from "@material-ui/icons/Image";
import { FormikProps } from "formik";

export interface FormValues {
  name: string;
  price: string;
  quantity: string;
  tags: string;
  category: string;
  partitionable: boolean;
  fullWeightPrice: string;
}

interface addItemFormProps {
  setImageUrl: Dispatch<SetStateAction<string>>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addItemForm: {
      minHeight: "45%",
      width: "50%",
      maxWidth: "450px",
      margin: "auto",
      padding: "20px",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translateX(-50%) translateY(-50%)",
      backgroundColor: "white",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-around",
    },
    fileUploadLabel: {
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    },
    fileUploadIcon: {
      width: "30px",
      height: "30px",
      marginLeft: "25px",
    },
    fileUploadInput: {
      opacity: 0,
      position: "absolute",
      zIndex: -1,
    },
    fileUploadForm: {},
    fileUploadDoneIcon: {
      color: `${theme.palette.primary.main}`,
    },
    fileUploadlabelAndIcon: {
      display: "flex",
      alignItems: "center",
    },
    partitionableCheckbox: {
      marginLeft: "0px",
    },
    checkboxAndFile: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-evenly",
    },
    spacer: {
      height: "48px",
      width: "100px",
    },
    partitionableContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      minWidth: "150px",
      maxWidth: "150px",
    },
    submitButton: {
      marginTop: "10px",
    },
  })
);

const AddItemForm = (props: addItemFormProps & FormikProps<FormValues>) => {
  const classes = useStyles();
  const {
    values: {
      name,
      price,
      quantity,
      tags,
      category,
      partitionable,
      fullWeightPrice,
    },
    errors,
    touched,
    handleSubmit,
    handleChange,
    isValid,
    setFieldTouched,
    setImageUrl,
    setFieldValue,
  } = props;

  const change = (name: string, e: SyntheticEvent) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  const [uploadDone, setUploadDone] = useState(false);

  const onPhotoSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const url = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}/upload`;

    if (event.target.files) {
      try {
        request
          .post(url)
          .field("upload_preset", cloudinaryConfig.upload_preset)
          .field("file", event.target.files[0])
          .field("multiple", false)
          .end((error, response) => {
            setImageUrl(response.body.secure_url);
            setUploadDone(true);
          });
      } catch (error) {
        return;
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.addItemForm}>
      <TextField
        id="name"
        label="Nombre"
        helperText={touched.name ? errors.name : ""}
        error={touched.name && Boolean(errors.name)}
        value={name}
        onChange={change.bind(null, "name")}
        fullWidth
      />

      <TextField
        id="price"
        label="Precio"
        type="number"
        helperText={touched.price ? errors.price : ""}
        error={touched.price && Boolean(errors.price)}
        value={price}
        onChange={change.bind(null, "price")}
        fullWidth
      />

      <TextField
        id="quantity"
        label="Cantidad"
        type="number"
        helperText={touched.quantity ? errors.quantity : ""}
        error={touched.quantity && Boolean(errors.quantity)}
        value={quantity}
        onChange={change.bind(null, "quantity")}
        fullWidth
      />

      <TextField
        id="tags"
        label="Etiquetas"
        helperText={touched.tags ? errors.tags : ""}
        error={touched.tags && Boolean(errors.tags)}
        value={tags}
        onChange={change.bind(null, "tags")}
        fullWidth
      />

      <TextField
        id="category"
        label="Categorias"
        helperText={touched.category ? errors.category : ""}
        error={touched.category && Boolean(errors.category)}
        value={category}
        onChange={change.bind(null, "category")}
        fullWidth
      />

      <div className={classes.checkboxAndFile}>
        <div className={classes.partitionableContainer}>
          <FormControlLabel
            control={
              <Checkbox
                name="partitionable"
                color="primary"
                onClick={() => setFieldValue("partitionable", !partitionable)}
                checked={partitionable}
              />
            }
            label="Divisible"
            labelPlacement="start"
            className={classes.partitionableCheckbox}
          />
          {partitionable ? (
            <TextField
              id="fullWeightPrice"
              type="number"
              label="Precio orma"
              helperText={touched.fullWeightPrice ? errors.fullWeightPrice : ""}
              error={touched.fullWeightPrice && Boolean(errors.fullWeightPrice)}
              value={fullWeightPrice}
              onChange={change.bind(null, "fullWeightPrice")}
              fullWidth
            />
          ) : (
            <div className={classes.spacer}></div>
          )}
        </div>

        <div className={classes.fileUploadForm}>
          <label className={classes.fileUploadLabel} htmlFor="fileUpload">
            <div className={classes.fileUploadlabelAndIcon}>
              Imagen: <ImageIcon className={classes.fileUploadIcon} />
            </div>
            {uploadDone ? (
              <DoneIcon className={classes.fileUploadDoneIcon} />
            ) : null}
          </label>
          <input
            accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
            id="fileUpload"
            multiple={true}
            type="file"
            className={classes.fileUploadInput}
            onChange={onPhotoSelected}
          />
        </div>
      </div>
      <Button
        type="submit"
        color="primary"
        variant="contained"
        disabled={!isValid}
        className={classes.submitButton}
      >
        <DoneIcon />
      </Button>
    </form>
  );
};

export default AddItemForm;
