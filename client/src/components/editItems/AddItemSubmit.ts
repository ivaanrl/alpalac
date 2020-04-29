import axios from "../../axios";
import { addItemFormValues } from "./EditItems";
import { FormikHelpers as FormikActions } from "formik";
import { FormValues } from "./AddItemForm";

export const AddItemSubmit = async (
  values: addItemFormValues,
  actions: FormikActions<FormValues>,
  imageUrl: string
) => {
  //const newItem =
  await axios.post("/items/addItem", {
    ...values,
    image: imageUrl,
  });
  actions.setSubmitting(false);
};
