import React, { useState } from 'react';
import ShoppingCartFull from './ShoppingCartFull/ShoppingCartFull';
import CheckoutForm from './ShoppingCartForm/CheckoutForm';
import * as Yup from 'yup';
import { Formik, FormikHelpers } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import allActions from '../../actions';
import { StoreState } from '../../reducers';
import ReviewPage from './ReviewPage/ReviewPage';
import axios from '../../axios';
import CircularProgress from '@material-ui/core/CircularProgress';

const checkoutFormValidationSchhema = Yup.object({
  name: Yup.string()
    .required('Debe ingresar un nombre')
    .min(2, 'Tu nombre debe ser de 2 o más caracteres'),
  lastName: Yup.string()
    .required('Debe ingresar un apellido')
    .min(2, 'Tu apellido debe ser de 2 o más caracteres.'),
  street: Yup.string().required('Debe ingresar una calle.'),
  number: Yup.string().required('Debe ingresar altura.'),
  phoneNumber: Yup.string()
    .required('Debe ingresar un número de teléfono.')
    .min(
      10,
      'Ingrese un número de teléfono válido. Código de area. Sin 15. Ej: 2262452362'
    )
    .max(
      10,
      'Ingrese un número de teléfono válido. Código de area. Sin 15. Ej: 2262452362'
    ),
});

export interface checkoutFormValues {
  name: string;
  lastName: string;
  street: string;
  number: string;
  phoneNumber: string;
}

const Checkout = () => {
  const dispatch = useDispatch();

  const user = useSelector((state: StoreState) => state.user);
  const shoppingCartItems = useSelector(
    (state: StoreState) => state.shoppingCart.shoppingCart
  );

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const initialCheckOutFormValues: checkoutFormValues = {
    name: user.firstName,
    lastName: user.lastName,
    street: user.street,
    number: user.number,
    phoneNumber: user.phoneNumber,
  };

  let pageShown;

  const nextPage = () => {
    setPage(page + 1);
  };

  const saveUserInfo = (
    values: checkoutFormValues,
    actions: FormikHelpers<checkoutFormValues>
  ) => {
    dispatch(allActions.addUserInfo(values));
  };

  const confirmPurchase = async () => {
    setIsLoading(true);
    const axiosResponse = await axios.post('/orders/new', {
      user,
      shoppingCart: shoppingCartItems,
    });
    setIsLoading(false);
    if (axiosResponse.status === 201) {
      setPage(4);
      dispatch(allActions.clearShoppingCart());
    }
  };

  if (page === 1) {
    pageShown = <ShoppingCartFull nextPage={nextPage} />;
  } else if (page === 2) {
    pageShown = (
      <Formik
        initialValues={initialCheckOutFormValues}
        validationSchema={checkoutFormValidationSchhema}
        onSubmit={(values, actions) => {
          saveUserInfo(values, actions);
          nextPage();
        }}
        render={(props) => <CheckoutForm {...props} />}
      />
    );
  } else if (page === 3) {
    pageShown = isLoading ? (
      <CircularProgress style={{ marginTop: '50px' }} />
    ) : (
      <ReviewPage confirmPurchase={confirmPurchase} />
    );
  } else if (page === 4) {
    pageShown = <div>Compra realizada</div>;
  }

  return <div>{pageShown} </div>;
};

export default Checkout;
