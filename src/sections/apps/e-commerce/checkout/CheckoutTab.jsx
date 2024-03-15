import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Grid, Stack, Tab, Tabs, Typography } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import BillingAddress from 'sections/apps/e-commerce/checkout/BillingAddress';
import Cart from 'sections/apps/e-commerce/checkout/Cart';
import CartEmpty from 'sections/apps/e-commerce/checkout/CartEmpty';
import Payment from 'sections/apps/e-commerce/checkout/Payment';

import { updateAddress } from 'api/address';
import { openSnackbar } from 'api/snackbar';
import {
  removeCartProduct,
  setBackStep,
  setBillingAddress,
  setCheckoutStep,
  setNextStep,
  setShippingCharge,
  updateCartProduct
} from 'api/cart';

// assets
import { CheckOutlined } from '@ant-design/icons';

const StyledTab = styled((props) => <Tab {...props} />)(({ theme }) => ({
  minHeight: 'auto',
  minWidth: 250,
  padding: 16,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  textAlign: 'left',
  justifyContent: 'flex-start',
  '&:after': {
    backgroundColor: 'transparent !important'
  },

  '& > svg': {
    marginBottom: '0px !important',
    marginRight: 10,
    marginTop: 2,
    height: 20,
    width: 20
  },
  [theme.breakpoints.down('md')]: {
    minWidth: 'auto'
  }
}));

StyledTab.propTypes = {
  theme: PropTypes.object,
  disable: PropTypes.bool,
  icon: PropTypes.node,
  label: PropTypes.node
};

// tabs option
const tabsOption = [
  {
    label: 'Cart'
  },
  {
    label: 'Shipping Information'
  },
  {
    label: 'Payment'
  }
];

// tabs
function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <div>{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number,
  index: PropTypes.number,
  other: PropTypes.any
};

// ==============================|| PRODUCT - CHECKOUT MAIN ||============================== //

const CheckoutTab = ({ cart }) => {
  const theme = useTheme();

  const isCart = cart.products && cart.products.length > 0;

  const [value, setValue] = useState(cart.step > 2 ? 2 : cart.step);
  const [billing, setBilling] = useState(cart.billing);

  const editBillingAddress = (addressEdit) => {
    updateAddress(addressEdit.id, addressEdit).then(() => setBillingAddress(addressEdit));
  };

  const handleChange = (newValue) => {
    setValue(newValue);
    setCheckoutStep(newValue);
  };

  useEffect(() => {
    setValue(cart.step > 2 ? 2 : cart.step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart.step]);

  const removeProduct = (id) => {
    removeCartProduct(id, cart.products);
    openSnackbar({
      open: true,
      message: 'Update Cart Success',
      variant: 'alert',
      alert: {
        color: 'success'
      }
    });
  };

  const updateQuantity = (id, quantity) => {
    updateCartProduct(id, quantity, cart.products);
  };

  const onNext = () => {
    setNextStep();
  };

  const onBack = () => {
    setBackStep();
  };

  const billingAddressHandler = (addressBilling) => {
    if (billing !== null || addressBilling !== null) {
      if (addressBilling !== null) {
        setBilling(addressBilling);
      }

      setBillingAddress(addressBilling !== null ? addressBilling : billing);
      onNext();
    } else {
      openSnackbar({
        open: true,
        message: 'Please select delivery address',
        variant: 'alert',
        alert: {
          color: 'error'
        }
      });
    }
  };

  const handleShippingCharge = (type) => {
    setShippingCharge(type, cart.shipping);
  };

  return (
    <Stack spacing={2}>
      <MainCard content={false}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Tabs
              value={value}
              onChange={(e, newValue) => handleChange(newValue)}
              aria-label="icon label tabs example"
              variant="scrollable"
              sx={{
                '& .MuiTabs-flexContainer': {
                  borderBottom: 'none'
                },
                '& .MuiTabs-indicator': {
                  display: 'none'
                },
                '& .MuiButtonBase-root + .MuiButtonBase-root': {
                  position: 'relative',
                  overflow: 'visible',
                  ml: 2,
                  '&:after': {
                    content: '""',
                    bgcolor: '#ccc',
                    width: 1,
                    height: 'calc(100% - 16px)',
                    position: 'absolute',
                    top: 8,
                    left: -8
                  }
                }
              }}
            >
              {tabsOption.map((tab, index) => (
                <StyledTab
                  theme={theme}
                  value={index}
                  cart={cart}
                  disabled={index > cart.step}
                  key={index}
                  label={
                    <Grid container>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Avatar
                          type={index !== cart.step ? 'combined' : 'filled'}
                          size="xs"
                          color={index > cart.step ? 'secondary' : 'primary'}
                        >
                          {index === cart.step ? index + 1 : <CheckOutlined />}
                        </Avatar>
                        <Typography color={index > cart.step ? 'textSecondary' : 'inherit'}>{tab.label}</Typography>
                      </Stack>
                    </Grid>
                  }
                />
              ))}
            </Tabs>
          </Grid>
        </Grid>
      </MainCard>
      <Grid container>
        <Grid item xs={12}>
          <TabPanel value={value} index={0}>
            {isCart && <Cart checkout={cart} onNext={onNext} removeProduct={removeProduct} updateQuantity={updateQuantity} />}
            {!isCart && <CartEmpty />}
          </TabPanel>
          <TabPanel value={value} index={1}>
            <BillingAddress checkout={cart} onBack={onBack} removeProduct={removeProduct} billingAddressHandler={billingAddressHandler} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Payment
              checkout={cart}
              onBack={onBack}
              onNext={onNext}
              handleShippingCharge={handleShippingCharge}
              removeProduct={removeProduct}
              editAddress={editBillingAddress}
            />
          </TabPanel>
        </Grid>
      </Grid>
    </Stack>
  );
};

CheckoutTab.propTypes = {
  cart: PropTypes.object
};

export default CheckoutTab;
